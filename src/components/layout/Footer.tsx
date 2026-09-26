import React from 'react';
import { ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';
import { Logo } from '../brand/Logo';

interface FooterProps {
  lang: LanguageCode;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const tr = t(lang);

  const getPath = (subPath: string) => {
    return lang === 'en' ? subPath : `/${lang}${subPath}`;
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060911] text-slate-600 dark:text-slate-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <button
              onClick={() => onNavigate(lang === 'en' ? '/' : `/${lang}`)}
              className="text-left focus:outline-none"
            >
              <Logo />
            </button>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {tr.footerDesc}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Private (No Uploads)
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-cyan-600 dark:text-cyan-400 font-medium">
                <Zap className="w-3.5 h-3.5" /> Instant Browser Engine
              </span>
            </div>
          </div>

          {/* Converters & Compression */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              {tr.tools}
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate(getPath('/webp-to-png'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                >
                  WebP to PNG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/webp-to-jpg'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                >
                  WebP to JPG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/png-to-jpg'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                >
                  PNG to JPG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/jpg-to-png'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                >
                  JPG to PNG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/image-compressor'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                >
                  Image Compressor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/image-resizer'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                >
                  Image Resizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/compress-jpg-to-100kb'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition text-cyan-600 dark:text-cyan-400 font-medium"
                >
                  Compress JPG to 100KB ★
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              {tr.guides}
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate(getPath('/guides/how-to-compress-jpg-to-100kb'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition text-left"
                >
                  Compress to 100KB Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/guides/webp-vs-png'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition text-left"
                >
                  WebP vs PNG Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/guides/webp-vs-jpg'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition text-left"
                >
                  WebP vs JPG Breakdown
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/guides/how-to-reduce-image-file-size'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition text-left"
                >
                  Reduce Image File Size
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/guides/jpg-vs-png-vs-webp'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition text-left"
                >
                  JPG vs PNG vs WebP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate(getPath('/guides'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition text-left font-semibold text-cyan-600 dark:text-cyan-400 pt-1 block"
                >
                  View All Guides →
                </button>
              </li>
            </ul>
          </div>

          {/* PAJOEIT Ecosystem & About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              {tr.ecosystem}
            </h4>
            <ul className="mt-4 space-y-3 text-xs">
              <li>
                <div className="font-semibold text-slate-800 dark:text-slate-300">
                  PAJOEIT CONVERT
                </div>
                <div className="text-[11px] text-slate-500">
                  Free client-side image engine
                </div>
              </li>
              <li>
                <a
                  href="https://wise.pajoeit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition"
                >
                  <span>PAJOEIT WISE</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-500" />
                </a>
                <div className="text-[11px] text-slate-500">
                  AI knowledge platform
                </div>
              </li>
              <li>
                <a
                  href="https://dev.pajoeit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition"
                >
                  <span>PAJOEIT DEV</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-500" />
                </a>
                <div className="text-[11px] text-slate-500">
                  Modern developer tooling
                </div>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate(getPath('/about'))}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition font-semibold"
                >
                  {tr.about} PAJOEIT CONVERT →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© {currentYear} PAJOEIT CONVERT. {tr.allRightsReserved}</p>
          <p className="mt-4 sm:mt-0 flex items-center gap-1.5 font-medium">
            {tr.designedFor}
          </p>
        </div>
      </div>
    </footer>
  );
};
