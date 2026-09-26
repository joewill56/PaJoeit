import { LanguageCode } from '../languages';
import { UI_TRANSLATIONS, UIStrings } from './ui';
import { getLocalizedTool, LocalizedToolContent } from './tools';

export function t(lang: LanguageCode): UIStrings {
  return UI_TRANSLATIONS[lang] || UI_TRANSLATIONS['en'];
}

export function getToolContent(slug: string, lang: LanguageCode): LocalizedToolContent {
  return getLocalizedTool(slug, lang);
}

export { UI_TRANSLATIONS };
export type { UIStrings };
