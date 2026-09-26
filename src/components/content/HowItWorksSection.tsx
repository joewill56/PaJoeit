import React from 'react';
import { UploadCloud, Sliders, Cpu, Download } from 'lucide-react';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

interface HowItWorksSectionProps {
  lang?: LanguageCode;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ lang = 'en' }) => {
  const tr = t(lang);

  const steps = [
    {
      num: '01',
      icon: UploadCloud,
      title: '1. Select Your Images',
      desc: 'Drag & drop single or multiple JPG, PNG, or WebP files from your phone or desktop. Clipboard paste (Ctrl+V) also works seamlessly.',
    },
    {
      num: '02',
      icon: Sliders,
      title: '2. Choose What You Want',
      desc: 'Pick your output format (JPG, PNG, WebP), compression level, exact dimensions, or set a target size like 100KB.',
    },
    {
      num: '03',
      icon: Cpu,
      title: '3. Process in Browser',
      desc: 'Our engine processes and resamples your pixels locally using HTML5 canvas acceleration without sending 1 byte over the internet.',
    },
    {
      num: '04',
      icon: Download,
      title: '4. Download or ZIP',
      desc: 'Compare before and after with the interactive slider, inspect compression savings, and download individually or packaged in a ZIP archive.',
    },
  ];

  return (
    <section className="mt-20 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-8 sm:p-12 shadow-sm backdrop-blur-xs">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          EFFORTLESS WORKFLOW
        </span>
        <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {tr.howTitle}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {tr.howSub}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 p-6 transition hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xl font-black text-slate-300 dark:text-slate-700">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
