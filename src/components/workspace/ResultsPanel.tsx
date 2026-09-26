import React from 'react';
import {
  CheckCircle,
  Archive,
  RotateCcw,
  TrendingDown,
  ShieldCheck,
} from 'lucide-react';
import { ProcessedImageItem } from '../../types/image';
import { formatBytes } from '../../lib/image-engine/file-utils';

interface ResultsPanelProps {
  items: ProcessedImageItem[];
  onDownloadZip: () => void;
  onReset: () => void;
  isZipping?: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  items,
  onDownloadZip,
  onReset,
  isZipping = false,
}) => {
  const successItems = items.filter((i) => i.status === 'success' && i.resultBlob);
  const totalOriginalBytes = successItems.reduce((acc, i) => acc + i.originalSize, 0);
  const totalResultBytes = successItems.reduce((acc, i) => acc + (i.resultSize || 0), 0);
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalResultBytes);
  const overallSavedPercent = totalOriginalBytes > 0
    ? Math.round((totalSavedBytes / totalOriginalBytes) * 100)
    : 0;

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-white/95 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-emerald-500/10 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Optimization Complete!
              </h3>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {successItems.length} {successItems.length === 1 ? 'file' : 'files'} ready
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Images processed and encoded directly in browser memory
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Process New Files</span>
          </button>

          {successItems.length > 0 && (
            <button
              onClick={onDownloadZip}
              disabled={isZipping}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/35 active:scale-95 transition-all disabled:opacity-50"
            >
              <Archive className="w-4 h-4" />
              <span>{isZipping ? 'Creating ZIP...' : `Download All (${successItems.length}) as ZIP`}</span>
            </button>
          )}
        </div>
      </div>

      {/* Aggregate Statistics */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Original Total */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            Original Total
          </span>
          <div className="mt-1 text-base sm:text-xl font-bold font-mono text-slate-700 dark:text-slate-300">
            {formatBytes(totalOriginalBytes)}
          </div>
        </div>

        {/* Optimized Total */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            Optimized Total
          </span>
          <div className="mt-1 text-base sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-300">
            {formatBytes(totalResultBytes)}
          </div>
        </div>

        {/* Space Saved */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" /> Space Saved
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
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Privacy Check
          </span>
          <div className="mt-1 text-base sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            0 Bytes Sent
          </div>
        </div>
      </div>
    </div>
  );
};
