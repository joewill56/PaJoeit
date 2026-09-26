import React from 'react';
import {
  ArrowLeft,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { GuideArticle } from '../../types/image';
import { TOOLS_CONFIG } from '../../lib/seo/routes-data';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';
import { Breadcrumbs } from '../layout/Breadcrumbs';

interface GuideDetailViewProps {
  guide: GuideArticle;
  lang: LanguageCode;
  onNavigate: (path: string) => void;
}

export const GuideDetailView: React.FC<GuideDetailViewProps> = ({
  guide,
  lang,
  onNavigate,
}) => {
  const tr = t(lang);

  const homePath = lang === 'en' ? '/' : `/${lang}`;
  const guidesPath = lang === 'en' ? '/guides' : `/${lang}/guides`;

  const breadcrumbs = [
    { label: tr.workspace, path: homePath },
    { label: tr.guides, path: guidesPath },
    { label: guide.title, isCurrent: true },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <Breadcrumbs items={breadcrumbs} lang={lang} onNavigate={onNavigate} />

      {/* Back button */}
      <button
        onClick={() => onNavigate(guidesPath)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white mb-6 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Guides</span>
      </button>

      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
          <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 font-mono text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/20">
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5" />
            {guide.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {guide.summary}
        </p>
      </header>

      {/* Interactive Quick Tool Launcher banner */}
      {guide.relatedTools.length > 0 && (
        <div className="my-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-50 dark:from-cyan-950/40 via-white dark:via-slate-900 to-indigo-50 dark:to-indigo-950/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Try the Free Online Tool
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Put this tutorial into practice right now directly in your browser
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {guide.relatedTools.map((toolKey) => {
              const tool = TOOLS_CONFIG[toolKey];
              if (!tool) return null;
              const toolPath = lang === 'en' ? `/${tool.slug}` : `/${lang}/${tool.slug}`;

              return (
                <button
                  key={toolKey}
                  onClick={() => onNavigate(toolPath)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:from-cyan-400 hover:to-indigo-500 transition"
                >
                  <span>Open {tool.shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Article Content with clean typography */}
      <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 pt-4 text-sm sm:text-base">
        {guide.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2
                key={idx}
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-800/80"
              >
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('#### ')) {
            return (
              <h3
                key={idx}
                className="text-lg font-bold text-slate-900 dark:text-slate-100 pt-2"
              >
                {paragraph.replace('#### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('---')) {
            return (
              <hr
                key={idx}
                className="border-slate-200 dark:border-slate-800 my-8"
              />
            );
          }
          if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
            const lines = paragraph.split('\n');
            return (
              <ul
                key={idx}
                className="list-disc list-inside space-y-2 pl-2 text-slate-700 dark:text-slate-300"
              >
                {lines.map((line, lIdx) => (
                  <li key={lIdx} className="leading-relaxed">
                    {line.replace(/^[-*]|\d+\.\s*/, '').trim()}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="leading-relaxed text-slate-700 dark:text-slate-300">
              {paragraph}
            </p>
          );
        })}
      </div>
    </article>
  );
};
