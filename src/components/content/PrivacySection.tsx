import React from 'react';
import { ShieldCheck, HardDrive, Cpu, ServerOff, Check } from 'lucide-react';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

interface PrivacySectionProps {
  lang?: LanguageCode;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({ lang = 'en' }) => {
  const tr = t(lang);

  return (
    <section id="privacy" className="mt-20 scroll-mt-24">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-gradient-to-b dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-950 p-8 sm:p-12 shadow-sm backdrop-blur-md">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>{tr.privacyBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {tr.privacyTitle}
            </h2>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              When you use traditional online file converters, your personal images—including personal IDs, family photographs, screenshots containing private messages, and copyrighted artwork—are uploaded across the public internet to third-party cloud servers where they may sit in temporary buckets or caches.
            </p>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>PAJOEIT CONVERT is fundamentally different.</strong> Every image conversion, resize calculation, and compression step in this application is executed entirely by your own browser using HTML5 Canvas, the JavaScript File API, and local CPU/GPU computation.
            </p>

            <div className="mt-6 space-y-3">
              {[
                {
                  title: 'Zero Cloud Storage',
                  desc: 'We do not run backend storage buckets or databases for your images. There is nowhere for your files to be logged, stored, or viewed by anyone.',
                },
                {
                  title: 'No Server Uploads',
                  desc: 'All conversion math happens inside your browser tab memory. When you close or refresh the tab, image blobs in RAM are instantly released.',
                },
                {
                  title: 'Offline Capable',
                  desc: 'Because PAJOEIT CONVERT executes locally, you can load the app once and continue compressing and converting images even when completely disconnected from the internet.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Architecture Box */}
          <div className="w-full lg:max-w-sm rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-950 p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <ServerOff className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{tr.privacyDiagramTitle}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>1. Your Device Disk</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Image loaded into browser RAM via FileReader.</p>
              </div>

              <div className="flex justify-center text-slate-400">↓</div>

              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                <div className="font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>2. Client HTML5 Canvas</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">GPU rasterizes, scales, and encodes locally.</p>
              </div>

              <div className="flex justify-center text-slate-400">↓</div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>3. Instant Direct Download</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">File or ZIP saved directly back to your device.</p>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 text-center font-bold">
              ✓ ZERO BYTES SENT TO SERVERS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
