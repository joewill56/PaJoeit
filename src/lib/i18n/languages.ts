export type LanguageCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'pt'
  | 'de'
  | 'ar'
  | 'hi'
  | 'id'
  | 'zh'
  | 'ja';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  isRTL?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRTL: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function isLanguageCode(code: string): code is LanguageCode {
  return SUPPORTED_LANGUAGES.some((l) => l.code === code);
}

/**
 * Extracts the language code and remaining path from a pathname
 * Examples:
 *  - "/es/webp-to-png" -> { lang: "es", subPath: "/webp-to-png" }
 *  - "/webp-to-png" -> { lang: "en", subPath: "/webp-to-png" }
 *  - "/ar" -> { lang: "ar", subPath: "/" }
 *  - "/" -> { lang: "en", subPath: "/" }
 */
export function parsePath(pathname: string): { lang: LanguageCode; subPath: string } {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const parts = clean.split('/').filter(Boolean);

  if (parts.length > 0 && isLanguageCode(parts[0])) {
    const lang = parts[0] as LanguageCode;
    const remaining = '/' + parts.slice(1).join('/');
    return {
      lang,
      subPath: remaining === '/' || remaining === '' ? '/' : remaining,
    };
  }

  return {
    lang: DEFAULT_LANGUAGE,
    subPath: clean,
  };
}

/**
 * Builds a localized path preserving the page
 * Examples:
 *  buildLocalizedPath('/webp-to-png', 'es') -> '/es/webp-to-png'
 *  buildLocalizedPath('/', 'fr') -> '/fr'
 *  buildLocalizedPath('/es/guides', 'de') -> '/de/guides'
 */
export function buildLocalizedPath(currentSubPath: string, targetLang: LanguageCode): string {
  const { subPath } = parsePath(currentSubPath);
  if (targetLang === DEFAULT_LANGUAGE) {
    return subPath === '/' ? '/' : subPath;
  }
  return subPath === '/' ? `/${targetLang}` : `/${targetLang}${subPath}`;
}
