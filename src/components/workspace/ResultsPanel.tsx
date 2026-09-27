import React from 'react';
import {
  CheckCircle,
  Archive,
  RotateCcw,
  TrendingDown,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { ProcessedImageItem } from '../../types/image';
import { formatBytes } from '../../lib/image-engine/file-utils';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

interface ResultsPanelProps {
  items: ProcessedImageItem[];
  onDownloadZip: () => void;
  onReset: () => void;
  onRetryFailed?: () => void;
  onClearCompleted?: () => void;
  onAddMore?: () => void;
  isZipping?: boolean;
  zipErrorMessage?: string | null;
  onDismissZipError?: () => void;
  lang?: LanguageCode;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  items,
  onDownloadZip,
  onReset,
  onRetryFailed,
  onClearCompleted,
  onAddMore,
  isZipping = false,
  zipErrorMessage = null,
  onDismissZipError,
  lang = 'en',
}) => {
  const tr = t(lang);
  const successItems = items.filter((i) => i.status === 'success' && i.resultBlob);
  const failedItems = items.filter((i) => i.status === 'error');
  const totalCount = items.length;

  const totalOriginalBytes = successItems.reduce((acc, i) => acc + i.originalSize, 0);
  const totalResultBytes = successItems.reduce((acc, i) => acc + (i.resultSize || 0), 0);
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalResultBytes);
  const overallSavedPercent =
    totalOriginalBytes > 0 ? Math.round((totalSavedBytes / totalOriginalBytes) * 100) : 0;

  const hasFailed = failedItems.length > 0;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* ZIP Error Alert if file too large */}
      {zipErrorMessage && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-rose-500/40 bg-rose-50 dark:bg-rose-950/40 p-4 text-rose-800 dark:text-rose-200 backdrop-blur-md shadow-md animate-in fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-500 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">{zipErrorMessage}</p>
          </div>
          {onDismissZipError && (
            <button
              onClick={onDismissZipError}
              className="rounded-lg p-1 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 transition"
              aria-label="Dismiss error"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <div
        className={`rounded-3xl border bg-white/95 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-colors ${
          hasFailed
            ? 'border-amber-500/30 dark:border-amber-500/20 shadow-amber-500/5'
            : 'border-emerald-500/30 dark:border-emerald-500/20 shadow-emerald-500/10'
        }`}
      >
        {/* Top Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-start sm:items-center gap-3.5">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-xs ${
                hasFailed
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
              }`}
            >
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {tr.batchProcessedSummary(successItems.length, totalCount)}
                </h3>
                {hasFailed && (
                  <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">
                    {tr.batchFailedSummary(failedItems.length)}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Processed client-side in browser memory • No files uploaded to servers
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Retry Failed Images Button */}
            {hasFailed && onRetryFailed && (
              <button
                onClick={onRetryFailed}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 shadow-xs transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{tr.retryFailed} ({failedItems.length})</span>
              </button>
            )}

            {/* Clear Completed */}
            {successItems.length > 0 && onClearCompleted && (
              <button
                onClick={onClearCompleted}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                title="Remove completed items from workspace"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{tr.clearCompleted}</span>
              </button>
            )}

            {/* Add More Files */}
            {onAddMore && totalCount < 50 && (
              <button
                onClick={onAddMore}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{tr.addMoreImages}</span>
              </button>
            )}

            {/* Clear All / Process New Files */}
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{tr.processNewFiles}</span>
            </button>

            {/* Download ZIP of successful results */}
            {successItems.length > 0 && (
              <button
                onClick={onDownloadZip}
                disabled={isZipping}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/35 active:scale-95 transition-all disabled:opacity-50"
              >
                <Archive className="w-4 h-4" />
                <span>{isZipping ? tr.creatingZip : `${tr.downloadAllZip} (${successItems.length})`}</span>
              </button>
            )}
          </div>
        </div>

        {/* Aggregate Statistics */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Original Total */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              {tr.originalTotal}
            </span>
            <div className="mt-1 text-base sm:text-xl font-bold font-mono text-slate-700 dark:text-slate-300">
              {formatBytes(totalOriginalBytes)}
            </div>
          </div>

          {/* Optimized Total */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              {tr.optimizedTotal}
            </span>
            <div className="mt-1 text-base sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-300">
              {formatBytes(totalResultBytes)}
            </div>
          </div>

          {/* Space Saved */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> {tr.spaceSaved}
            </span>
            <div className="mt-1 text-base sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-300">
              {overallSavedPercent > 0 ? `-${overallSavedPercent}%` : '0%'}
              <span className="text-xs font-normal text-slate-500 ml-1">
                ({formatBytes(totalSavedBytes)})
              </span>
            </div>
          </div>

          {/* Privacy Metric */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> {tr.trustPrivate}
            </span>
            <div className="mt-1 text-base sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {tr.zeroBytesSent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

