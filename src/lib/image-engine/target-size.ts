import { ImageDimensions } from '../../types/image';
import { canvasToBlobAsync } from './canvas-engine';

export interface TargetSizeResult {
  blob: Blob;
  dimensions: ImageDimensions;
  quality: number;
  note: string;
}

/**
 * Intelligent, memory-efficient target size optimizer.
 *
 * Avoids repeated huge canvas allocations.
 * First tests sensible quality levels.
 * If file remains larger than target size, performs targeted dimension downscaling.
 * Releases all temporary canvases immediately.
 */
export async function optimizeToTargetSize(
  sourceCanvas: HTMLCanvasElement,
  targetMime: string,
  targetKB: number,
  onProgress?: (step: string) => void
): Promise<TargetSizeResult> {
  const targetBytes = targetKB * 1024;

  // JPEG or WebP can be compressed; PNG cannot be lossy compressed via canvas.toBlob quality
  const isLossy = targetMime === 'image/jpeg' || targetMime === 'image/webp';
  const effectiveMime = isLossy ? targetMime : 'image/jpeg';

  let currentCanvas: HTMLCanvasElement = sourceCanvas;
  let currentWidth = sourceCanvas.width;
  let currentHeight = sourceCanvas.height;
  let isCurrentCanvasScratch = false;

  const cleanupScratch = () => {
    if (isCurrentCanvasScratch && currentCanvas && currentCanvas !== sourceCanvas) {
      currentCanvas.width = 0;
      currentCanvas.height = 0;
    }
  };

  try {
    // PRE-OPTIMIZATION CHECK:
    // Determine sensible max dimension based on target size to avoid doing multiple
    // heavy encoding passes on 12MP-24MP buffers.
    let maxInitialDim = 2560;
    if (targetKB <= 100) {
      maxInitialDim = 1600;
    } else if (targetKB <= 200) {
      maxInitialDim = 1920;
    }

    if (currentWidth > maxInitialDim || currentHeight > maxInitialDim) {
      onProgress?.('Initial sizing for target limit...');
      const preScale = maxInitialDim / Math.max(currentWidth, currentHeight);
      const preW = Math.max(320, Math.round(currentWidth * preScale));
      const preH = Math.max(240, Math.round(currentHeight * preScale));

      const initialScratch = document.createElement('canvas');
      initialScratch.width = preW;
      initialScratch.height = preH;
      const scratchCtx = initialScratch.getContext('2d');
      if (scratchCtx) {
        if (effectiveMime === 'image/jpeg') {
          scratchCtx.fillStyle = '#ffffff';
          scratchCtx.fillRect(0, 0, preW, preH);
        }
        scratchCtx.imageSmoothingEnabled = true;
        scratchCtx.imageSmoothingQuality = 'high';
        scratchCtx.drawImage(sourceCanvas, 0, 0, preW, preH);

        currentCanvas = initialScratch;
        currentWidth = preW;
        currentHeight = preH;
        isCurrentCanvasScratch = true;
      }
    }

    let bestBlob: Blob | null = null;
    let bestQuality = 0.75;

    // PASS 1: Test balanced quality (0.75)
    onProgress?.(`Testing compression (Pass 1/3: 75% quality)...`);
    const blob1 = await canvasToBlobAsync(currentCanvas, effectiveMime, 0.75);
    bestBlob = blob1;
    bestQuality = 0.75;

    if (blob1.size <= targetBytes) {
      // If already under target:
      // If it is significantly under (< 65% of target), test higher quality (0.85) to maximize sharpness
      if (blob1.size < targetBytes * 0.65) {
        onProgress?.(`Fine-tuning quality for sharpness (Pass 2/3)...`);
        try {
          const blobHigh = await canvasToBlobAsync(currentCanvas, effectiveMime, 0.85);
          if (blobHigh.size <= targetBytes) {
            bestBlob = blobHigh;
            bestQuality = 0.85;
          }
        } catch {
          // Keep blob1
        }
      }
    } else {
      // Still above target.
      // PASS 2: Try medium compression (0.50)
      onProgress?.(`Adjusting compression (Pass 2/3: 50% quality)...`);
      try {
        const blob2 = await canvasToBlobAsync(currentCanvas, effectiveMime, 0.50);
        if (blob2.size <= targetBytes || blob2.size < bestBlob.size) {
          bestBlob = blob2;
          bestQuality = 0.50;
        }

        if (blob2.size > targetBytes) {
          // PASS 3: Try lower quality (0.30)
          onProgress?.(`Adjusting compression (Pass 3/3: 30% quality)...`);
          const blob3 = await canvasToBlobAsync(currentCanvas, effectiveMime, 0.30);
          if (blob3.size <= targetBytes || blob3.size < bestBlob.size) {
            bestBlob = blob3;
            bestQuality = 0.30;
          }

          // PASS 4: If STILL over target size at quality 0.30, the pixel dimensions are too large.
          // Perform targeted dimension reduction preserving aspect ratio.
          if (bestBlob.size > targetBytes && currentWidth > 360 && currentHeight > 270) {
            onProgress?.(`Adjusting dimensions for target size...`);

            // Estimate needed scale factor based on area ratio
            const scale = Math.max(0.35, Math.min(0.85, Math.sqrt(targetBytes / bestBlob.size) * 0.95));
            const newW = Math.max(320, Math.round(currentWidth * scale));
            const newH = Math.max(240, Math.round(currentHeight * scale));

            const scaledCanvas = document.createElement('canvas');
            scaledCanvas.width = newW;
            scaledCanvas.height = newH;
            const sCtx = scaledCanvas.getContext('2d');
            if (sCtx) {
              if (effectiveMime === 'image/jpeg') {
                sCtx.fillStyle = '#ffffff';
                sCtx.fillRect(0, 0, newW, newH);
              }
              sCtx.imageSmoothingEnabled = true;
              sCtx.imageSmoothingQuality = 'high';
              sCtx.drawImage(currentCanvas, 0, 0, newW, newH);

              // Clean up previous scratch canvas immediately
              cleanupScratch();
              currentCanvas = scaledCanvas;
              currentWidth = newW;
              currentHeight = newH;
              isCurrentCanvasScratch = true;

              // Test with clean quality (0.65) on resized canvas
              const blobScaled = await canvasToBlobAsync(currentCanvas, effectiveMime, 0.65);
              if (blobScaled.size <= targetBytes || blobScaled.size < bestBlob.size) {
                bestBlob = blobScaled;
                bestQuality = 0.65;
              }

              // If still slightly over, final step with 0.40
              if (bestBlob.size > targetBytes) {
                const blobScaled2 = await canvasToBlobAsync(currentCanvas, effectiveMime, 0.40);
                if (blobScaled2.size <= targetBytes || blobScaled2.size < bestBlob.size) {
                  bestBlob = blobScaled2;
                  bestQuality = 0.40;
                }
              }
            }
          }
        }
      } catch {
        // If an intermediate step fails, retain current bestBlob
      }
    }

    if (!bestBlob) {
      bestBlob = await canvasToBlobAsync(currentCanvas, effectiveMime, 0.70);
    }

    const resultKB = +(bestBlob.size / 1024).toFixed(1);
    let note = '';
    if (resultKB <= targetKB) {
      note = `Compressed to ${resultKB} KB (under ${targetKB} KB target).`;
    } else {
      note = `Reached ${resultKB} KB (Target: ${targetKB} KB). Safest practical compression reached.`;
    }

    return {
      blob: bestBlob,
      dimensions: { width: currentWidth, height: currentHeight },
      quality: bestQuality,
      note,
    };
  } finally {
    cleanupScratch();
  }
}
