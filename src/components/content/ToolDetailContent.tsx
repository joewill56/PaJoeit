import React from 'react';
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Info,
} from 'lucide-react';
import { ToolRouteConfig } from '../../types/image';
import { TOOLS_CONFIG, GUIDES_DATA } from '../../lib/seo/routes-data';
import { LanguageCode } from '../../lib/i18n/languages';
import { getLocalizedTool } from '../../lib/i18n/translations/tools';
import { t } from '../../lib/i18n/translations';

interface ToolDetailContentProps {
  tool: ToolRouteConfig;
  lang: LanguageCode;
  onNavigate: (path: string) => void;
}

export const ToolDetailContent: React.FC<ToolDetailContentProps> = ({
  tool,
  lang,
  onNavigate,
}) => {
  const content = getLocalizedTool(tool.slug, lang);
  const tr = t(lang);

  return (
    <div className="mt-16 space-y-16">
      {/* 1. Features & Capabilities */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-8 sm:p-10 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Key Features & Standards
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 p-4"
            >
              <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Overview & Technical Explanation */}
      {content.explanation && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              {content.explanation.overviewTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.explanation.overviewContent}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              {content.explanation.whyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {content.explanation.whyContent}
            </p>
            {content.explanation.specs && (
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-2">
                {content.explanation.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex justify-between text-xs">
                    <span className="text-slate-500 font-mono">{spec.label}:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. How to Use Step-by-Step */}
      <section>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          STEP-BY-STEP TUTORIAL
        </span>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          How to Use {content.shortTitle}
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.howToSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-5 shadow-sm"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-mono text-xs font-bold mb-3">
                {step.step}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{step.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Real-World Use Cases */}
      {content.useCases.length > 0 && (
        <section>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            PRACTICAL APPLICATIONS
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Common Use Cases
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {content.useCases.map((uc, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{uc.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Frequently Asked Questions (FAQ) */}
      {content.faqs.length > 0 && (
        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>ANSWERS & CLARIFICATIONS</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {content.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/70 p-5"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Related Tools & Guides Internal Linking */}
      <section className="border-t border-slate-200 dark:border-slate-800/80 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Related Tools */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Related Image Utilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.relatedTools.map((relKey) => {
                const relTool = TOOLS_CONFIG[relKey];
                if (!relTool) return null;
                const path = lang === 'en' ? `/${relTool.slug}` : `/${lang}/${relTool.slug}`;

                return (
                  <button
                    key={relKey}
                    onClick={() => onNavigate(path)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-white transition"
                  >
                    <span>{relTool.shortTitle}</span>
                    <ArrowRight className="w-3 h-3 text-cyan-500" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Related Guides */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Recommended Guides
            </h3>
            <div className="space-y-2">
              {tool.relatedGuides.map((guideSlug) => {
                const guide = GUIDES_DATA[guideSlug];
                if (!guide) return null;
                const path = lang === 'en' ? `/guides/${guide.slug}` : `/${lang}/guides/${guide.slug}`;

                return (
                  <button
                    key={guideSlug}
                    onClick={() => onNavigate(path)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white transition shadow-sm"
                  >
                    <span className="truncate pr-2">{guide.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
