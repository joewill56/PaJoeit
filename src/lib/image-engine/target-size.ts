import { ImageDimensions } from '../../types/image';

interface TargetSizeResult {
  blob: Blob;
  dimensions: ImageDimensions;
  quality: number;
  note: string;
}

/**
 * Intelligent binary search target size optimizer.
 * Attempts to optimize an image to approach a target size (in KB)
 * through adaptive quality stepping and, if necessary, slight dimension downscaling.
 */
export async function optimizeToTargetSize(
  sourceCanvas: HTMLCanvasElement,
  targetMime: string,
  targetKB: number,
  onProgress?: (step: string) => void
): Promise<TargetSizeResult> {
  const targetBytes = targetKB * 1024;
  const tolerance = targetBytes * 0.08; // Within 8% or just under is considered optimal

  // For PNG, PNG does not have quality argument in canvas.toBlob.
  // If target size is requested on PNG, we must either downscale or suggest JPG/WebP.
  const isLossy = targetMime === 'image/jpeg' || targetMime === 'image/webp';
  const effectiveMime = isLossy ? targetMime : 'image/jpeg';

  let currentCanvas = sourceCanvas;
  let currentWidth = sourceCanvas.width;
  let currentHeight = sourceCanvas.height;

  let bestBlob: Blob | null = null;
  let bestQuality = 0.8;
  let iterations = 0;
  const maxIterations = 8;

  let minQ = 0.05;
  let maxQ = 0.95;

  // Step 1: Initial quality binary search
  while (iterations < maxIterations) {
    iterations++;
    const testQ = (minQ + maxQ) / 2;
    onProgress?.(`Calibrating compression: step ${iterations}/${maxIterations}`);

    const blob = await canvasToBlobAsync(currentCanvas, effectiveMime, testQ);
    const size = blob.size;

    if (!bestBlob || Math.abs(size - targetBytes) < Math.abs(bestBlob.size - targetBytes) || (size <= targetBytes && size > (bestBlob.size || 0))) {
      bestBlob = blob;
      bestQuality = testQ;
    }

    if (Math.abs(size - targetBytes) <= tolerance && size <= targetBytes) {
      // Near perfect match under target
      break;
    }

    if (size > targetBytes) {
      maxQ = testQ;
    } else {
      minQ = testQ;
    }
  }

  // Step 2: If after quality reduction to lowest reasonable limit (~0.15),
  // the file is still larger than target, perform step-down resolution scaling.
  let scaleAttempts = 0;
  while (bestBlob && bestBlob.size > targetBytes && scaleAttempts < 4 && currentWidth > 320 && currentHeight > 240) {
    scaleAttempts++;
    onProgress?.(`Adjusting dimensions for target size (pass ${scaleAttempts})`);

    const scaleFactor = Math.max(0.65, Math.sqrt(targetBytes / bestBlob.size) * 0.95);
    const newWidth = Math.max(320, Math.round(currentWidth * scaleFactor));
    const newHeight = Math.max(240, Math.round(currentHeight * scaleFactor));

    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = newWidth;
    scaledCanvas.height = newHeight;
    const ctx = scaledCanvas.getContext('2d');
    if (!ctx) break;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(currentCanvas, 0, 0, newWidth, newHeight);

    currentCanvas = scaledCanvas;
    currentWidth = newWidth;
    currentHeight = newHeight;

    // Test with balanced quality
    const testBlob = await canvasToBlobAsync(currentCanvas, effectiveMime, 0.72);
    if (testBlob.size <= targetBytes || testBlob.size < bestBlob.size) {
      bestBlob = testBlob;
      bestQuality = 0.72;
    }
  }

  if (!bestBlob) {
    bestBlob = await canvasToBlobAsync(sourceCanvas, effectiveMime, 0.75);
  }

  const resultKB = +(bestBlob.size / 1024).toFixed(1);
  let note = '';
  if (resultKB <= targetKB) {
    note = `Successfully compressed to ${resultKB} KB (under ${targetKB} KB target).`;
  } else {
    note = `Reached ${resultKB} KB. Smallest safe size preserved without excessive quality loss.`;
  }

  return {
    blob: bestBlob,
    dimensions: { width: currentWidth, height: currentHeight },
    quality: bestQuality,
    note,
  };
}

function canvasToBlobAsync(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      },
      mime,
      quality
    );
  });
}
