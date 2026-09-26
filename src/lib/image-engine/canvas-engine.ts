import { ImageDimensions, ImageProcessingSettings, ProcessedImageItem } from '../../types/image';
import { getExtensionFromMime } from './file-utils';
import { optimizeToTargetSize } from './target-size';

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
 * Loads a File or Blob into an HTMLImageElement
 */
export function loadImageElement(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to parse or decode image data.'));
    };
    img.src = url;
  });
}

/**
 * Calculate destination dimensions based on user settings
 */
export function calculateTargetDimensions(
  original: ImageDimensions,
  settings: ImageProcessingSettings
): ImageDimensions {
  if (!settings.resizeEnabled) {
    return { ...original };
  }

  // Percentage scaling
  if (settings.resizeScalePercent && settings.resizeScalePercent > 0 && settings.resizeScalePercent <= 200) {
    const factor = settings.resizeScalePercent / 100;
    return {
      width: Math.max(1, Math.round(original.width * factor)),
      height: Math.max(1, Math.round(original.height * factor)),
    };
  }

  const { resizeWidth, resizeHeight, lockAspectRatio } = settings;

  if (resizeWidth && resizeHeight) {
    if (lockAspectRatio) {
      // Fit inside requested box while preserving ratio
      const ratio = Math.min(resizeWidth / original.width, resizeHeight / original.height);
      return {
        width: Math.max(1, Math.round(original.width * ratio)),
        height: Math.max(1, Math.round(original.height * ratio)),
      };
    }
    return {
      width: Math.max(1, Math.round(resizeWidth)),
      height: Math.max(1, Math.round(resizeHeight)),
    };
  }

  if (resizeWidth && !resizeHeight) {
    const factor = resizeWidth / original.width;
    return {
      width: Math.max(1, Math.round(resizeWidth)),
      height: lockAspectRatio ? Math.max(1, Math.round(original.height * factor)) : original.height,
    };
  }

  if (!resizeWidth && resizeHeight) {
    const factor = resizeHeight / original.height;
    return {
      width: lockAspectRatio ? Math.max(1, Math.round(original.width * factor)) : original.width,
      height: Math.max(1, Math.round(resizeHeight)),
    };
  }

  return { ...original };
}

/**
 * Multi-step bilinear downsampling for crisp, alias-free downscaling
 */
function drawResampled(
  ctx: CanvasRenderingContext2D,
  source: HTMLImageElement | HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number
) {
  let curW = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
  let curH = source instanceof HTMLImageElement ? source.naturalHeight : source.height;

  // If downscaling by more than 2x, perform step-down halving
  if (curW > targetWidth * 2 || curH > targetHeight * 2) {
    const offCanvas = document.createElement('canvas');
    let offCtx = offCanvas.getContext('2d');
    if (!offCtx) {
      ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
      return;
    }

    offCanvas.width = curW;
    offCanvas.height = curH;
    offCtx.drawImage(source, 0, 0);

    while (curW > targetWidth * 2 || curH > targetHeight * 2) {
      const nextW = Math.max(targetWidth, Math.floor(curW / 2));
      const nextH = Math.max(targetHeight, Math.floor(curH / 2));

      const stepCanvas = document.createElement('canvas');
      stepCanvas.width = nextW;
      stepCanvas.height = nextH;
      const stepCtx = stepCanvas.getContext('2d');
      if (!stepCtx) break;

      stepCtx.imageSmoothingEnabled = true;
      stepCtx.imageSmoothingQuality = 'high';
      stepCtx.drawImage(offCanvas, 0, 0, curW, curH, 0, 0, nextW, nextH);

      offCanvas.width = nextW;
      offCanvas.height = nextH;
      offCtx = offCanvas.getContext('2d');
      if (!offCtx) break;
      offCtx.drawImage(stepCanvas, 0, 0);

      curW = nextW;
      curH = nextH;
    }

    ctx.drawImage(offCanvas, 0, 0, curW, curH, 0, 0, targetWidth, targetHeight);
  } else {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
  }
}

/**
 * Executes the unified image processing pipeline
 */
export async function processSingleImage(
  item: ProcessedImageItem,
  onProgress?: (progress: number, stepMsg: string) => void
): Promise<ProcessImageResult> {
  onProgress?.(15, 'Loading image into memory...');
  const img = await loadImageElement(item.file);

  const originalDims: ImageDimensions = {
    width: img.naturalWidth,
    height: img.naturalHeight,
  };

  const targetDims = calculateTargetDimensions(originalDims, item.settings);

  onProgress?.(35, 'Initializing render canvas...');
  const canvas = document.createElement('canvas');
  canvas.width = targetDims.width;
  canvas.height = targetDims.height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context could not be acquired.');
  }

  // Determine target MIME
  let outputMime = item.settings.outputFormat;
  if (outputMime === 'original') {
    outputMime = (item.originalFormat || 'image/jpeg') as any;
  }
  // Fallback to jpeg if unknown
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(outputMime)) {
    outputMime = 'image/jpeg';
  }

  // If output is JPEG, alpha transparency becomes black by default;
  // fill with clean opaque white background to make PNG/WebP conversion look clean
  if (outputMime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  onProgress?.(55, 'Rendering and resampling image...');
  drawResampled(ctx, img, targetDims.width, targetDims.height);

  let finalBlob: Blob;
  let finalDims = targetDims;
  let targetAchievedInfo: ProcessImageResult['targetAchieved'] = undefined;

  if (item.settings.targetSizeEnabled && item.settings.targetSizeKB && item.settings.targetSizeKB > 0) {
    onProgress?.(70, `Optimizing toward target size (${item.settings.targetSizeKB} KB)...`);
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
    // Quality mapping based on preset or custom quality
    let quality = item.settings.quality;
    if (item.settings.compressionPreset === 'none') {
      quality = 1.0;
    } else if (item.settings.compressionPreset === 'light') {
      quality = 0.88;
    } else if (item.settings.compressionPreset === 'balanced') {
      quality = 0.75;
    } else if (item.settings.compressionPreset === 'max') {
      quality = 0.50;
    }

    // PNG does not use lossy quality in canvas.toBlob
    if (outputMime === 'image/png') {
      finalBlob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej(new Error('PNG export failed'))), 'image/png');
      });
    } else {
      finalBlob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej(new Error('Blob encoding failed'))), outputMime, quality);
      });
    }
  }

  onProgress?.(95, 'Finalizing result...');
  const resultUrl = URL.createObjectURL(finalBlob);
  const originalSize = item.originalSize || item.file.size;
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
