import { ImageDimensions, ImageErrorCode, ImageProcessingSettings, ProcessedImageItem } from '../../types/image';
import { getDeviceMemorySafeLimits, getExtensionFromMime, isSupportedImageFile } from './file-utils';
import { optimizeToTargetSize } from './target-size';

export class ImageProcessingError extends Error {
  code: ImageErrorCode;
  isTransientMemoryError: boolean;

  constructor(code: ImageErrorCode, message: string, isTransientMemoryError = false) {
    super(message);
    this.name = 'ImageProcessingError';
    this.code = code;
    this.isTransientMemoryError = isTransientMemoryError;
  }
}

export interface ProcessImageResult {
  blob: Blob;
  url: string;
  size: number;
  dimensions: ImageDimensions;
  format: string;
  savedPercent: number;
  targetAchieved?: {
    targetKB: number;
    actualKB: number;
    note: string;
  };
}

/**
 * Fallback loader for Blob to HTMLImageElement
 */
function loadImageElementFallback(blob: Blob): Promise<{ img: HTMLImageElement; objectUrl: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      resolve({ img, objectUrl: url });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image could not be decoded. File may be corrupted or in an unsupported format.'));
    };
    img.src = url;
  });
}

/**
 * Calculates target output dimensions based on user settings,
 * while respecting device memory safety limits.
 */
export function calculateTargetDimensions(
  original: ImageDimensions,
  settings: ImageProcessingSettings
): ImageDimensions {
  const limits = getDeviceMemorySafeLimits();

  // Guard against missing or zero dimensions
  const origW = original && original.width > 0 ? original.width : 1920;
  const origH = original && original.height > 0 ? original.height : 1080;

  // If user requested custom resize:
  if (settings.resizeEnabled) {
    if (settings.resizeScalePercent && settings.resizeScalePercent > 0 && settings.resizeScalePercent <= 200) {
      const factor = settings.resizeScalePercent / 100;
      return {
        width: Math.max(1, Math.round(origW * factor)),
        height: Math.max(1, Math.round(origH * factor)),
      };
    }

    const { resizeWidth, resizeHeight, lockAspectRatio } = settings;

    if (resizeWidth && resizeHeight) {
      if (lockAspectRatio) {
        const ratio = Math.min(resizeWidth / origW, resizeHeight / origH);
        return {
          width: Math.max(1, Math.round(origW * ratio)),
          height: Math.max(1, Math.round(origH * ratio)),
        };
      }
      return {
        width: Math.max(1, Math.round(resizeWidth)),
        height: Math.max(1, Math.round(resizeHeight)),
      };
    }

    if (resizeWidth && !resizeHeight) {
      const factor = resizeWidth / origW;
      return {
        width: Math.max(1, Math.round(resizeWidth)),
        height: lockAspectRatio ? Math.max(1, Math.round(origH * factor)) : origH,
      };
    }

    if (!resizeWidth && resizeHeight) {
      const factor = resizeHeight / origH;
      return {
        width: lockAspectRatio ? Math.max(1, Math.round(origW * factor)) : origW,
        height: Math.max(1, Math.round(resizeHeight)),
      };
    }
  }

  // If resize is NOT enabled:
  // Automatically calculate safe working resolution while preserving exact aspect ratio
  let targetW = origW;
  let targetH = origH;
  const maxDim = Math.max(targetW, targetH);
  const area = targetW * targetH;

  if (maxDim > limits.safeWorkingMaxDim || area > limits.safeWorkingMaxArea) {
    // Gracefully scale down to safe working limit preserving exact aspect ratio
    const dimScale = limits.safeWorkingMaxDim / maxDim;
    const areaScale = Math.sqrt(limits.safeWorkingMaxArea / area);
    const safeScale = Math.min(dimScale, areaScale);

    targetW = Math.max(1, Math.round(targetW * safeScale));
    targetH = Math.max(1, Math.round(targetH * safeScale));
  }

  return { width: targetW, height: targetH };
}

/**
 * Decodes the image source efficiently using createImageBitmap when supported,
 * falling back to HTMLImageElement.
 */
async function decodeSourceImage(
  blob: Blob,
  targetDims: ImageDimensions,
  originalDims: ImageDimensions
): Promise<{ source: ImageBitmap | HTMLImageElement; isBitmap: boolean; objectUrl?: string }> {
  if (typeof createImageBitmap === 'function') {
    // If target dimensions are smaller than original, decode and downsample in one step
    const isDownscaling =
      (originalDims.width > 0 && targetDims.width < originalDims.width) ||
      (originalDims.height > 0 && targetDims.height < originalDims.height);

    if (isDownscaling && targetDims.width > 0 && targetDims.height > 0) {
      try {
        const bitmap = await createImageBitmap(blob, {
          resizeWidth: targetDims.width,
          resizeHeight: targetDims.height,
          resizeQuality: 'high',
        });
        return { source: bitmap, isBitmap: true };
      } catch {
        // Options not supported or failed, try standard decode
      }
    }

    try {
      const bitmap = await createImageBitmap(blob);
      return { source: bitmap, isBitmap: true };
    } catch {
      // Fallback to HTMLImageElement
    }
  }

  // Fallback
  const { img, objectUrl } = await loadImageElementFallback(blob);
  return { source: img, isBitmap: false, objectUrl };
}

/**
 * Encodes canvas to a Blob using canvas.toBlob() with automatic memory recovery.
 * If canvas.toBlob returns null due to device memory constraints, attempts a graceful
 * downsample recovery before failing with a helpful error message.
 */
export function canvasToBlobAsync(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      if (!canvas || canvas.width <= 0 || canvas.height <= 0) {
        reject(
          new ImageProcessingError(
            'DIMENSION_ERROR',
            'This image is too large for this device to process safely. Try a smaller image or resize it first.'
          )
        );
        return;
      }

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            resolve(blob);
            return;
          }

          // If blob is null, the browser rejected encoding due to memory constraints or unsupported format.
          // Attempt automatic graceful recovery if canvas is large:
          if (canvas.width > 1200 || canvas.height > 1200) {
            try {
              const recScale = 0.75;
              const recW = Math.max(640, Math.round(canvas.width * recScale));
              const recH = Math.max(480, Math.round(canvas.height * recScale));
              const recCanvas = document.createElement('canvas');
              recCanvas.width = recW;
              recCanvas.height = recH;
              const recCtx = recCanvas.getContext('2d');
              if (recCtx) {
                if (mimeType === 'image/jpeg') {
                  recCtx.fillStyle = '#ffffff';
                  recCtx.fillRect(0, 0, recW, recH);
                }
                recCtx.imageSmoothingEnabled = true;
                recCtx.imageSmoothingQuality = 'medium';
                recCtx.drawImage(canvas, 0, 0, recW, recH);

                recCanvas.toBlob(
                  (recBlob) => {
                    recCanvas.width = 0;
                    recCanvas.height = 0;
                    if (recBlob) {
                      resolve(recBlob);
                    } else {
                      reject(
                        new ImageProcessingError(
                          'MEMORY_ERROR',
                          'This image is too large for this device to process safely.',
                          true
                        )
                      );
                    }
                  },
                  mimeType,
                  quality
                );
                return;
              }
            } catch {
              // Proceed to reject below
            }
          }

          // Fallback check if WebP encoding failed in an older WebKit environment
          if (mimeType === 'image/webp') {
            try {
              canvas.toBlob(
                (fallbackBlob) => {
                  if (fallbackBlob) resolve(fallbackBlob);
                  else
                    reject(
                      new ImageProcessingError(
                        'MEMORY_ERROR',
                        'This image is too large for this device to process safely.',
                        true
                      )
                    );
                },
                'image/jpeg',
                quality
              );
              return;
            } catch {
              // Fallthrough
            }
          }

          reject(
            new ImageProcessingError(
              'MEMORY_ERROR',
              'This image is too large for this device to process safely.',
              true
            )
          );
        },
        mimeType,
        quality
      );
    } catch (err: any) {
      reject(
        new ImageProcessingError('COMPRESSION_ERROR', err?.message || 'Compression failed: Canvas export error.')
      );
    }
  });
}

/**
 * Executes the unified, memory-efficient image processing pipeline.
 */
export async function processSingleImage(
  item: ProcessedImageItem,
  onProgress?: (progress: number, stepMsg: string) => void
): Promise<ProcessImageResult> {
  const limits = getDeviceMemorySafeLimits();
  const file = item.file;

  // 1. Initial Format and Size Validation
  if (!file || file.size === 0) {
    throw new ImageProcessingError(
      'DECODE_ERROR',
      'Image could not be decoded. The file may be corrupted or in an unsupported format.'
    );
  }

  if (!isSupportedImageFile(file)) {
    throw new ImageProcessingError('UNSUPPORTED_FORMAT', 'This image format is not supported.');
  }

  // 2. Validate Dimensions Safety Check
  const origW = item.originalDimensions.width;
  const origH = item.originalDimensions.height;

  if (origW > limits.maxDimensionAllowed || origH > limits.maxDimensionAllowed || (origW * origH) > limits.maxAreaAllowed) {
    throw new ImageProcessingError(
      'DIMENSION_ERROR',
      'This image is too large for this device to process safely. Try a smaller image or resize it first.'
    );
  }

  onProgress?.(15, 'Preparing memory-safe decode...');
  const targetDims = calculateTargetDimensions(item.originalDimensions, item.settings);

  // 3. Decode Image using createImageBitmap or fallback
  onProgress?.(30, 'Decoding image...');
  let decoded: { source: ImageBitmap | HTMLImageElement; isBitmap: boolean; objectUrl?: string };
  try {
    decoded = await decodeSourceImage(file, targetDims, item.originalDimensions);
  } catch (err: any) {
    const msg = String(err?.message || '').toLowerCase();
    if (
      msg.includes('memory') ||
      msg.includes('quota') ||
      msg.includes('allocation') ||
      msg.includes('arraybuffer') ||
      msg.includes('heap')
    ) {
      throw new ImageProcessingError(
        'MEMORY_ERROR',
        'This image is too large for this device to process safely.',
        true
      );
    }
    throw new ImageProcessingError(
      'DECODE_ERROR',
      'Image could not be decoded. The file may be corrupted or in an unsupported format.'
    );
  }

  onProgress?.(50, 'Initializing canvas buffer...');
  const canvas = document.createElement('canvas');
  canvas.width = targetDims.width;
  canvas.height = targetDims.height;

  const ctx = canvas.getContext('2d', { willReadFrequently: false });
  if (!ctx) {
    if (decoded.isBitmap) (decoded.source as ImageBitmap).close();
    if (decoded.objectUrl) URL.revokeObjectURL(decoded.objectUrl);
    canvas.width = 0;
    canvas.height = 0;
    throw new ImageProcessingError(
      'MEMORY_ERROR',
      'This image is too large for this device to process safely.',
      true
    );
  }

  // 4. Output MIME determination
  let outputMime = item.settings.outputFormat;
  if (outputMime === 'original') {
    outputMime = (item.originalFormat || 'image/jpeg') as any;
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(outputMime)) {
    outputMime = 'image/jpeg';
  }

  // 5. Alpha background handling for JPEG:
  // When converting transparent PNG/WebP to JPEG, fill canvas with clean opaque white
  if (outputMime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetDims.width, targetDims.height);
  }

  // 6. Draw image onto canvas
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(decoded.source, 0, 0, targetDims.width, targetDims.height);

  // 7. CRITICAL: Release decoded bitmap/image immediately after drawing
  if (decoded.isBitmap) {
    (decoded.source as ImageBitmap).close();
  } else {
    if (decoded.objectUrl) {
      URL.revokeObjectURL(decoded.objectUrl);
    }
    const htmlImg = decoded.source as HTMLImageElement;
    htmlImg.src = '';
    htmlImg.onload = null;
    htmlImg.onerror = null;
  }

  // 8. Compression / Target Size
  let finalBlob: Blob;
  let finalDims = targetDims;
  let targetAchievedInfo: ProcessImageResult['targetAchieved'] = undefined;

  try {
    if (item.settings.targetSizeEnabled && item.settings.targetSizeKB && item.settings.targetSizeKB > 0) {
      onProgress?.(70, `Targeting ${item.settings.targetSizeKB} KB...`);
      const targetResult = await optimizeToTargetSize(
        canvas,
        outputMime,
        item.settings.targetSizeKB,
        (step) => onProgress?.(80, step)
      );
      finalBlob = targetResult.blob;
      finalDims = targetResult.dimensions;
      targetAchievedInfo = {
        targetKB: item.settings.targetSizeKB,
        actualKB: +(finalBlob.size / 1024).toFixed(1),
        note: targetResult.note,
      };
    } else {
      onProgress?.(75, 'Encoding compressed file...');
      let quality = typeof item.settings.quality === 'number' ? item.settings.quality : 0.75;
      if (item.settings.compressionPreset === 'none') {
        quality = 1.0;
      } else if (item.settings.compressionPreset === 'light') {
        quality = 0.88;
      } else if (item.settings.compressionPreset === 'balanced') {
        quality = 0.75;
      } else if (item.settings.compressionPreset === 'max') {
        quality = 0.50;
      } else {
        // 'custom' or any custom quality slider value
        quality = Math.max(0.10, Math.min(1.0, quality));
      }

      if (outputMime === 'image/png') {
        finalBlob = await canvasToBlobAsync(canvas, 'image/png');
      } else {
        finalBlob = await canvasToBlobAsync(canvas, outputMime, quality);
      }
    }
  } finally {
    // 9. CRITICAL: Release canvas GPU and backing buffer immediately
    canvas.width = 0;
    canvas.height = 0;
  }

  onProgress?.(95, 'Finalizing result...');
  const resultUrl = URL.createObjectURL(finalBlob);
  const originalSize = item.originalSize || file.size;
  const savedBytes = originalSize - finalBlob.size;
  const savedPercent = Math.max(0, Math.round((savedBytes / originalSize) * 100));

  return {
    blob: finalBlob,
    url: resultUrl,
    size: finalBlob.size,
    dimensions: finalDims,
    format: getExtensionFromMime(outputMime).toUpperCase(),
    savedPercent,
    targetAchieved: targetAchievedInfo,
  };
}
