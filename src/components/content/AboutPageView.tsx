import React from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  FileCode2,
  HardDrive,
  Globe2,
} from 'lucide-react';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';
import { Breadcrumbs } from '../layout/Breadcrumbs';

interface AboutPageViewProps {
  lang: LanguageCode;
  onNavigate: (path: string) => void;
}

export const AboutPageView: React.FC<AboutPageViewProps> = ({ lang, onNavigate }) => {
  const tr = t(lang);

  const breadcrumbs = [
    { label: tr.workspace, path: lang === 'en' ? '/' : `/${lang}` },
    { label: tr.about, isCurrent: true },
  ];

  const toolsList = [
    { name: 'WebP to PNG', path: lang === 'en' ? '/webp-to-png' : `/${lang}/webp-to-png` },
    { name: 'WebP to JPG', path: lang === 'en' ? '/webp-to-jpg' : `/${lang}/webp-to-jpg` },
    { name: 'PNG to JPG', path: lang === 'en' ? '/png-to-jpg' : `/${lang}/png-to-jpg` },
    { name: 'JPG to PNG', path: lang === 'en' ? '/jpg-to-png' : `/${lang}/jpg-to-png` },
    { name: 'Image Compressor', path: lang === 'en' ? '/image-compressor' : `/${lang}/image-compressor` },
    { name: 'Image Resizer', path: lang === 'en' ? '/image-resizer' : `/${lang}/image-resizer` },
    { name: 'Compress JPG to 100KB', path: lang === 'en' ? '/compress-jpg-to-100kb' : `/${lang}/compress-jpg-to-100kb` },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} lang={lang} onNavigate={onNavigate} />

      {/* Header */}
      <section className="text-center pt-2 pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PAJOEIT CONVERT Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          About PAJOEIT CONVERT
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The free, private, high-performance image workspace built for speed and engineered with strict privacy principles.
        </p>
      </section>

      {/* The Core Story & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-6">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Why We Built PAJOEIT CONVERT
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Most online image conversion websites operate on an outdated model: they force users to upload personal, sensitive photos to remote cloud servers, wait in queue, view aggressive popups, and frequently hit artificial paywalls.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We believe everyday image editing—converting WebP to PNG, compressing photos, and resizing dimensions—should run instantly inside your browser with complete privacy. Your images never leave your computer or phone.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6">
            <Cpu className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Pure In-Browser Image Engine
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            PAJOEIT CONVERT is powered by HTML5 Canvas rasterization, bicubic downsampling interpolation, and adaptive binary search target algorithms.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Because execution is 100% client-side, processing is instantaneous, operates even offline via PWA, and can batch-process dozens of photos simultaneously into a downloadable ZIP package.
          </p>
        </div>
      </div>

      {/* The PAJOEIT Brand Ecosystem */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The PAJOEIT Family
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Part of a focused suite of modern digital utilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PAJOEIT CONVERT */}
          <div className="relative rounded-2xl border-2 border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-950/20 p-6">
            <span className="absolute top-4 right-4 rounded-full bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              Active Tool
            </span>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-bold text-lg">
                P
              </div>
              <div>
                <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">PAJOEIT</div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">CONVERT</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Universal in-browser image engine for WebP, PNG, and JPG conversion, compression, and target size matching with zero cloud uploads.
            </p>
          </div>

          {/* PAJOEIT WISE */}
          <a
            href="https://wise.pajoeit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 p-6 hover:border-indigo-500/50 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold text-lg group-hover:scale-105 transition-transform">
                  W
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">PAJOEIT</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                    WISE
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Knowledge workspace and AI-assisted research platform designed for clarity, summarization, and deep learning.
            </p>
          </a>

          {/* PAJOEIT DEV */}
          <a
            href="https://dev.pajoeit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold text-lg group-hover:scale-105 transition-transform">
                  D
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">PAJOEIT</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors">
                    DEV
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Fast, distraction-free developer utilities, format formatters, regex analyzers, and engineering benchmarks.
            </p>
          </a>
        </div>
      </section>

      {/* Available Tools Quick Links */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-8 mb-16 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Explore All Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {toolsList.map((tool) => (
            <button
              key={tool.path}
              onClick={() => onNavigate(tool.path)}
              className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-cyan-500/40 hover:bg-cyan-500/5 dark:hover:bg-cyan-500/10 transition group text-left"
            >
              <span>{tool.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
