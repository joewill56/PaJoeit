import { FormatExtension, ImageDimensions, SupportedFormat } from '../../types/image';

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatDimensions(dims?: ImageDimensions): string {
  if (!dims || !dims.width || !dims.height) return '—';
  return `${dims.width} × ${dims.height}`;
}

export function getMimeShortName(mime: string): string {
  if (!mime) return 'IMAGE';
  if (mime.includes('webp')) return 'WEBP';
  if (mime.includes('jpeg') || mime.includes('jpg')) return 'JPG';
  if (mime.includes('png')) return 'PNG';
  if (mime.includes('gif')) return 'GIF';
  if (mime.includes('svg')) return 'SVG';
  if (mime.includes('bmp')) return 'BMP';
  if (mime.includes('avif')) return 'AVIF';
  return mime.split('/')[1]?.toUpperCase() || 'IMG';
}

export function getExtensionFromMime(mime: string): FormatExtension {
  if (mime === 'image/webp') return 'webp';
  if (mime === 'image/png') return 'png';
  return 'jpg';
}

export function getMimeFromExtension(ext: string): SupportedFormat {
  const clean = ext.toLowerCase().replace('.', '');
  if (clean === 'webp') return 'image/webp';
  if (clean === 'png') return 'image/png';
  if (clean === 'jpg' || clean === 'jpeg') return 'image/jpeg';
  return 'original';
}

export function isSupportedImageFile(file: File): boolean {
  const validMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/svg+xml',
    'image/avif',
  ];
  if (validMimes.includes(file.type)) return true;
  const validExtensions = /\.(jpe?g|png|webp|gif|bmp|svg|avif)$/i;
  return validExtensions.test(file.name);
}

export function generateOutputFilename(
  originalName: string,
  targetMime: SupportedFormat,
  originalMime: string,
  suffix = ''
): string {
  const dotIndex = originalName.lastIndexOf('.');
  const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
  
  let targetExt: string;
  if (targetMime === 'original') {
    targetExt = getExtensionFromMime(originalMime);
  } else {
    targetExt = getExtensionFromMime(targetMime);
  }

  const cleanSuffix = suffix ? `-${suffix}` : '';
  return `${baseName}${cleanSuffix}.${targetExt}`;
}

export function getImageDimensions(file: Blob): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for dimensions check'));
    };
    img.src = url;
  });
}
