import { LanguageCode } from '../languages';
import { UI_TRANSLATIONS, UIStrings } from './ui';
import { BATCH_TRANSLATIONS, BatchStrings } from './batch';
import { getLocalizedTool, LocalizedToolContent } from './tools';

export function t(lang: LanguageCode): UIStrings & BatchStrings {
  const ui = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS['en'];
  const batch = BATCH_TRANSLATIONS[lang] || BATCH_TRANSLATIONS['en'];
  return { ...ui, ...batch };
}

export function getToolContent(slug: string, lang: LanguageCode): LocalizedToolContent {
  return getLocalizedTool(slug, lang);
}

export { UI_TRANSLATIONS, BATCH_TRANSLATIONS };
export type { UIStrings, BatchStrings };
