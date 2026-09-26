import React, { useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  lang: LanguageCode;
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, lang, onNavigate }) => {
  const isRTL = lang === 'ar';

  // Inject BreadcrumbList JSON-LD structured data
  useEffect(() => {
    const existing = document.getElementById('breadcrumbs-jsonld');
    if (existing) existing.remove();

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://pajoeit-convert.pages.dev';

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.label,
        'item': item.path ? `${baseUrl}${item.path}` : `${baseUrl}${window.location.pathname}`,
      })),
    };

    const script = document.createElement('script');
    script.id = 'breadcrumbs-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('breadcrumbs-jsonld');
      if (el) el.remove();
    };
  }, [items]);

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 overflow-x-auto py-1 scrollbar-none"
    >
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index === 0 && (
                <Home className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mr-0.5 inline-block" />
              )}
              {item.path && !isLast ? (
                <button
                  onClick={() => onNavigate(item.path!)}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors underline-offset-2 hover:underline"
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={
                    isLast
                      ? 'font-semibold text-slate-900 dark:text-slate-200'
                      : 'text-slate-500 dark:text-slate-400'
                  }
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight
                  className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0 ${
                    isRTL ? 'rotate-180' : ''
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
