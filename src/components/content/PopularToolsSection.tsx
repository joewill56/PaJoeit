import React from 'react';
import {
  FileType,
  ArrowRight,
  Maximize2,
  Sliders,
  Target,
  Sparkles,
} from 'lucide-react';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

interface PopularToolsSectionProps {
  lang?: LanguageCode;
  onNavigate: (path: string) => void;
}

export const PopularToolsSection: React.FC<PopularToolsSectionProps> = ({
  lang = 'en',
  onNavigate,
}) => {
  const tr = t(lang);

  const getToolPath = (slug: string) => {
    return lang === 'en' ? slug : `/${lang}${slug}`;
  };

  const tools = [
    {
      slug: '/webp-to-png',
      name: 'WebP to PNG',
      desc: 'Convert WebP to lossless PNG with transparent alpha backgrounds preserved.',
      badge: 'Transparent',
      icon: FileType,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    },
    {
      slug: '/webp-to-jpg',
      name: 'WebP to JPG',
      desc: 'Convert WebP downloads into universal JPG photos with clean background fill.',
      badge: 'Universal',
      icon: FileType,
      color: 'from-indigo-500/20 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    },
    {
      slug: '/png-to-jpg',
      name: 'PNG to JPG',
      desc: 'Slash heavy screenshot and graphics file sizes by up to 80%.',
      badge: 'Save 80%',
      icon: FileType,
      color: 'from-sky-500/20 to-teal-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
    },
    {
      slug: '/jpg-to-png',
      name: 'JPG to PNG',
      desc: 'Transform JPG images into clean PNG files for Photoshop, Figma, and design.',
      badge: 'Lossless',
      icon: FileType,
      color: 'from-violet-500/20 to-pink-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30',
    },
    {
      slug: '/compress-jpg-to-100kb',
      name: 'Compress JPG to 100KB',
      desc: 'Target size engine reduces images toward 100KB for government and school forms.',
      badge: 'Popular ★',
      icon: Target,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    },
    {
      slug: '/image-compressor',
      name: 'Image Compressor',
      desc: 'Smart perceptual compression shaves off megabytes while retaining visual clarity.',
      badge: 'Balanced',
      icon: Sliders,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    },
    {
      slug: '/image-resizer',
      name: 'Image Resizer',
      desc: 'Scale pixel dimensions with locked aspect ratio and bicubic downsampling.',
      badge: 'Proportional',
      icon: Maximize2,
      color: 'from-rose-500/20 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    },
  ];

  return (
    <section className="mt-20">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>7 Specialized Utilities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {tr.popularToolsTitle}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          {tr.popularToolsSub}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          const fullPath = getToolPath(tool.slug);

          return (
            <button
              key={tool.slug}
              onClick={() => onNavigate(fullPath)}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:bg-white dark:hover:bg-slate-900/70 hover:shadow-lg hover:shadow-cyan-500/5 focus:outline-none shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} border shadow-xs`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-slate-600 dark:text-slate-300">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 opacity-80 group-hover:opacity-100 group-hover:gap-1.5 transition-all">
                <span>{tr.openTool}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
