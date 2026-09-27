import JSZip from 'jszip';
import { ProcessedImageItem } from '../../types/image';
import { generateOutputFilename } from './file-utils';

/**
 * Downloads a single processed image file
 */
export function downloadSingleFile(item: ProcessedImageItem): void {
  if (!item.resultBlob) return;

  const filename = generateOutputFilename(
    item.name,
    item.settings.outputFormat,
    item.originalFormat,
    item.settings.suffix
  );

  const url = item.resultUrl || URL.createObjectURL(item.resultBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Bundles all successfully processed images into a ZIP archive and triggers download
 */
export async function downloadAllAsZip(
  items: ProcessedImageItem[],
  zipName = 'pajoeit-convert-bundle.zip',
  onProgress?: (percent: number) => void
): Promise<void> {
  const successfulItems = items.filter((item) => item.status === 'success' && item.resultBlob);
  if (successfulItems.length === 0) return;

  const zip = new JSZip();
  const folder = zip.folder('pajoeit-images') || zip;

  const usedNames = new Set<string>();

  for (let i = 0; i < successfulItems.length; i++) {
    const item = successfulItems[i];
    let filename = generateOutputFilename(
      item.name,
      item.settings.outputFormat,
      item.originalFormat,
      item.settings.suffix
    );

    // Prevent filename collision
    if (usedNames.has(filename)) {
      const dot = filename.lastIndexOf('.');
      const base = dot !== -1 ? filename.slice(0, dot) : filename;
      const ext = dot !== -1 ? filename.slice(dot) : '';
      filename = `${base}-${i + 1}${ext}`;
    }
    usedNames.add(filename);

    if (item.resultBlob) {
      folder.file(filename, item.resultBlob);
    }
  }

  try {
    const content = await zip.generateAsync(
      {
        type: 'blob',
        compression: 'STORE', // Images are already compressed; STORE avoids wasteful duplicate recompression and RAM spikes
      },
      (metadata) => {
        onProgress?.(Math.round(metadata.percent));
      }
    );

    const zipUrl = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = zipUrl;
    a.download = zipName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
  } catch (err: any) {
    throw new Error(
      'Your files were processed successfully, but this ZIP is too large for this device to create reliably. Please download the files individually or create smaller batches.'
    );
  }
}
