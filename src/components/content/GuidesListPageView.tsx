import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Search, Sparkles, Filter, Sliders } from 'lucide-react';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';
import { GUIDES_DATA } from '../../lib/seo/routes-data';
import { Breadcrumbs } from '../layout/Breadcrumbs';

interface GuidesListPageViewProps {
  lang: LanguageCode;
  onNavigate: (path: string) => void;
}

export const GuidesListPageView: React.FC<GuidesListPageViewProps> = ({ lang, onNavigate }) => {
  const tr = t(lang);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const breadcrumbs = [
    { label: tr.workspace, path: lang === 'en' ? '/' : `/${lang}` },
    { label: tr.guides, isCurrent: true },
  ];

  const guides = Object.values(GUIDES_DATA);
  const categories = ['All', 'Optimization Guide', 'Format Comparison', 'Web Performance', 'Deep Dive'];

  const filteredGuides = guides.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} lang={lang} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="text-center pt-2 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 font-mono mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge & Best Practices</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Image Optimization Guides
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Master image compression, format selection (WebP vs JPG vs PNG), Core Web Vitals optimization, and strict portal file limits.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => {
          const guideUrl = lang === 'en' ? `/guides/${guide.slug}` : `/${lang}/guides/${guide.slug}`;
          const primaryToolSlug = guide.relatedTools[0];
          const toolUrl = primaryToolSlug
            ? lang === 'en'
              ? `/${primaryToolSlug}`
              : `/${lang}/${primaryToolSlug}`
            : null;

          return (
            <div
              key={guide.slug}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 shadow-sm hover:border-cyan-500/40 hover:shadow-md transition group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <h2
                  onClick={() => onNavigate(guideUrl)}
                  className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 cursor-pointer transition-colors leading-snug mb-2"
                >
                  {guide.title}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-6">
                  {guide.summary}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs font-semibold">
                <button
                  onClick={() => onNavigate(guideUrl)}
                  className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition"
                >
                  <span>{tr.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {toolUrl && (
                  <button
                    onClick={() => onNavigate(toolUrl)}
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition text-[11px]"
                  >
                    Open Tool ↗
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto opacity-40 mb-3" />
          <p className="text-sm font-semibold">No guides matched your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-2 text-xs text-cyan-500 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
