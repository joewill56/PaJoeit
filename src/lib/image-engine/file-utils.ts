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

/**
 * Detects whether the current device is a mobile device or memory-constrained environment.
 */
export function isMobileOrLowMemoryDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as any;
  const isTouch = ('ontouchstart' in window) || (nav.maxTouchPoints > 0);
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  const lowCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
  const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nav.userAgent || '');
  return mobileUA || (isTouch && lowMemory) || lowMemory || (isTouch && lowCores);
}

/**
 * Retrieves safe dimension and area thresholds based on the device environment.
 */
export function getDeviceMemorySafeLimits() {
  const isMobile = isMobileOrLowMemoryDevice();
  return {
    isMobile,
    // Absolute bounds above which devices crash GPU textures or run out of memory
    maxDimensionAllowed: isMobile ? 8192 : 12288,
    maxAreaAllowed: isMobile ? 36_000_000 : 64_000_000,
    // Safe working resolution when user did not request custom resize
    // Mobile: 2560px max dim (~5.5MP / 22MB uncompressed) keeps processing 100% reliable on Android & iOS
    // Desktop: 3840px max dim (4K UHD / ~12MP) preserves ultra-high resolution
    safeWorkingMaxDim: isMobile ? 2560 : 3840,
    safeWorkingMaxArea: isMobile ? 5_500_000 : 12_000_000,
  };
}

/**
 * Parses image dimensions directly from file binary header bytes without decoding
 * the entire image into memory. Works instantly for JPEG, PNG, WebP, GIF, BMP.
 */
export function parseHeaderDimensions(bytes: Uint8Array): ImageDimensions | null {
  if (!bytes || bytes.length < 24) return null;

  try {
    // 1. PNG Check: 89 50 4E 47 0D 0A 1A 0A
    if (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    ) {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const width = view.getUint32(16, false);
      const height = view.getUint32(20, false);
      if (width > 0 && height > 0) return { width, height };
    }

    // 2. GIF Check: 'GIF87a' or 'GIF89a'
    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const width = view.getUint16(6, true);
      const height = view.getUint16(8, true);
      if (width > 0 && height > 0) return { width, height };
    }

    // 3. BMP Check: 'BM'
    if (bytes[0] === 0x42 && bytes[1] === 0x4d && bytes.length >= 26) {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const width = view.getInt32(18, true);
      const height = Math.abs(view.getInt32(22, true));
      if (width > 0 && height > 0) return { width, height };
    }

    // 4. WebP Check: 'RIFF'....'WEBP'
    if (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    ) {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const type = String.fromCharCode(bytes[12], bytes[13], bytes[14], bytes[15]);

      if (type === 'VP8 ' && bytes.length >= 30) {
        // Lossy VP8
        const width = (view.getUint16(26, true) & 0x3fff);
        const height = (view.getUint16(28, true) & 0x3fff);
        if (width > 0 && height > 0) return { width, height };
      } else if (type === 'VP8L' && bytes.length >= 25) {
        // Lossless VP8L
        const b1 = bytes[21];
        const b2 = bytes[22];
        const b3 = bytes[23];
        const b4 = bytes[24];
        const width = 1 + (((b2 & 0x3f) << 8) | b1);
        const height = 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
        if (width > 0 && height > 0) return { width, height };
      } else if (type === 'VP8X' && bytes.length >= 30) {
        // Extended VP8X
        const width = 1 + (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16));
        const height = 1 + (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16));
        if (width > 0 && height > 0) return { width, height };
      }
    }

    // 5. JPEG Check: 0xFF, 0xD8 (SOI)
    if (bytes[0] === 0xff && bytes[1] === 0xd8) {
      let offset = 2;
      const len = bytes.length;
      while (offset < len - 8) {
        if (bytes[offset] !== 0xff) {
          offset++;
          continue;
        }

        const marker = bytes[offset + 1];
        // Markers with SOF (Start of Frame)
        if (
          marker === 0xc0 ||
          marker === 0xc1 ||
          marker === 0xc2 ||
          marker === 0xc3 ||
          marker === 0xc5 ||
          marker === 0xc6 ||
          marker === 0xc7 ||
          marker === 0xc9 ||
          marker === 0xca ||
          marker === 0xcb
        ) {
          const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
          const width = (bytes[offset + 7] << 8) | bytes[offset + 8];
          if (width > 0 && height > 0) return { width, height };
        }

        // SOS (Start of Scan) or EOI (End of Image) -> stop scanning
        if (marker === 0xda || marker === 0xd9) {
          break;
        }

        const segmentLength = (bytes[offset + 2] << 8) | bytes[offset + 3];
        if (segmentLength < 2) break;
        offset += 2 + segmentLength;
      }
    }
  } catch {
    // If parsing fails, return null to fallback
  }

  return null;
}

/**
 * Retrieves image dimensions efficiently.
 * 1. Checks binary header via first 64KB slice (0ms, 0MB RAM, no decoding)
 * 2. Falls back to HTMLImageElement using img.decode() with immediate object URL revocation
 */
export async function getImageDimensions(file: Blob): Promise<ImageDimensions> {
  // Pass 1: Binary header inspection (fast, zero memory overhead)
  try {
    const slice = file.slice(0, 65536);
    const arrayBuffer = await slice.arrayBuffer();
    const parsed = parseHeaderDimensions(new Uint8Array(arrayBuffer));
    if (parsed && parsed.width > 0 && parsed.height > 0) {
      return parsed;
    }
  } catch {
    // Fallback to decode
  }

  // Pass 2: HTMLImageElement with img.decode()
  const url = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    let isSettled = false;

    const cleanup = () => {
      if (!isSettled) {
        isSettled = true;
        URL.revokeObjectURL(url);
        img.onload = null;
        img.onerror = null;
        img.src = '';
      }
    };

    img.onload = () => {
      const dims = { width: img.naturalWidth || 1920, height: img.naturalHeight || 1080 };
      cleanup();
      resolve(dims);
    };

    img.onerror = () => {
      cleanup();
      reject(new Error('Image could not be decoded. File may be corrupted or in an unsupported format.'));
    };

    img.src = url;

    // Utilize browser-native img.decode() when supported
    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(() => {
          if (!isSettled && (img.naturalWidth > 0 || img.width > 0)) {
            const dims = { width: img.naturalWidth || 1920, height: img.naturalHeight || 1080 };
            cleanup();
            resolve(dims);
          }
        })
        .catch(() => {
          // Fall back to onload handler if decode() is interrupted
        });
    }
  });
}

/**
 * Creates a zero-copy object URL preview for workspace display.
 * Avoids allocating heavy intermediate canvas buffers or extra Blobs in memory.
 */
export function createThumbnailUrl(file: Blob, _maxDim = 200): string {
  return URL.createObjectURL(file);
}
