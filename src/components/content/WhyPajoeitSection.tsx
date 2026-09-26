import React from 'react';
import {
  ShieldCheck,
  Zap,
  UserX,
  Layers,
  Smartphone,
  Cpu,
} from 'lucide-react';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

interface WhyPajoeitSectionProps {
  lang?: LanguageCode;
}

export const WhyPajoeitSection: React.FC<WhyPajoeitSectionProps> = ({ lang = 'en' }) => {
  const tr = t(lang);

  const benefits = [
    {
      icon: ShieldCheck,
      title: '100% Private & In-Browser',
      desc: 'Your photos are processed on your device using client-side Web APIs. Unlike other online converters, your private pictures are never uploaded to a cloud server.',
      badge: 'Zero Uploads',
    },
    {
      icon: UserX,
      title: 'No Signup or Account Required',
      desc: 'No credit cards, no logins, no paywalls, and no email spam. Open the website and start converting instantly.',
      badge: 'Free Forever',
    },
    {
      icon: Zap,
      title: 'Instant Execution Speed',
      desc: 'Zero network upload delay. Large images decode and compress at the full speed of your computer or phone GPU.',
      badge: 'Instant',
    },
    {
      icon: Layers,
      title: 'Batch Processing & ZIP Download',
      desc: 'Process 1 or 50 images in a single batch. Download your files individually or bundled in an organized ZIP file with one click.',
      badge: 'Multi-File',
    },
    {
      icon: Smartphone,
      title: 'Designed for Mobile & PWA',
      desc: 'Fluid touch UX, comparison sliders, and installable as a Progressive Web App (PWA) with offline workspace capabilities.',
      badge: 'Touch Friendly',
    },
    {
      icon: Cpu,
      title: 'Adaptive Target Size Engine',
      desc: 'Need an image under 100KB for a government form or job portal? Our engine calibrates quality and dimensions to hit your exact quota.',
      badge: 'Target 100KB',
    },
  ];

  return (
    <section className="mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          THE BROWSER-FIRST ADVANTAGE
        </span>
        <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {tr.whyTitle}
        </h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {tr.whySub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-6 shadow-xs backdrop-blur-xs transition hover:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-900/60"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                  {b.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {b.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
