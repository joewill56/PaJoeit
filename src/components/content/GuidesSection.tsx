import React from 'react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { GUIDES_DATA } from '../../lib/seo/routes-data';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

interface GuidesSectionProps {
  lang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ lang = 'en', onNavigate }) => {
  const tr = t(lang);
  const guidesList = Object.values(GUIDES_DATA);

  const getGuidePath = (slug: string) => {
    return lang === 'en' ? `/guides/${slug}` : `/${lang}/guides/${slug}`;
  };

  const getGuidesAllPath = () => {
    return lang === 'en' ? '/guides' : `/${lang}/guides`;
  };

  return (
    <section className="mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            KNOWLEDGE BASE & TUTORIALS
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {tr.guidesTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            {tr.guidesSub}
          </p>
        </div>

        <button
          onClick={() => onNavigate(getGuidesAllPath())}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition self-start sm:self-auto"
        >
          <span>View All Guides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {guidesList.map((guide) => (
          <article
            key={guide.slug}
            onClick={() => onNavigate(getGuidePath(guide.slug))}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/60 p-5 cursor-pointer transition hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:shadow-cyan-500/5 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold border border-slate-200 dark:border-slate-700">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <Clock className="w-3 h-3" />
                  {guide.readTime}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                {guide.title}
              </h3>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <span>{tr.readArticle}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
