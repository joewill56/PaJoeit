import React, { useState } from 'react';
import {
  Play,
  Trash2,
  Sliders,
  Loader2,
  Layers,
} from 'lucide-react';
import { ImageProcessingSettings, ProcessedImageItem } from '../../types/image';
import { FileCard } from './FileCard';
import { SettingsPanel } from './SettingsPanel';
import { WorkflowBar } from './WorkflowBar';
import { ProcessingOverlay } from './ProcessingOverlay';
import { ResultsPanel } from './ResultsPanel';
import { Dropzone } from '../upload/Dropzone';
import { BeforeAfterModal } from '../ui/BeforeAfterModal';
import { processSingleImage } from '../../lib/image-engine/canvas-engine';
import { downloadAllAsZip } from '../../lib/image-engine/zip-downloader';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

interface FileWorkspaceProps {
  items: ProcessedImageItem[];
  setItems: React.Dispatch<React.SetStateAction<ProcessedImageItem[]>>;
  globalSettings: ImageProcessingSettings;
  setGlobalSettings: React.Dispatch<React.SetStateAction<ImageProcessingSettings>>;
  onAddFiles: (files: File[]) => void;
  onClearAll: () => void;
  lang?: LanguageCode;
}

export const FileWorkspace: React.FC<FileWorkspaceProps> = ({
  items,
  setItems,
  globalSettings,
  setGlobalSettings,
  onAddFiles,
  onClearAll,
  lang = 'en',
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(0);
  const [currentProcessingFile, setCurrentProcessingFile] = useState('');
  const [currentStepMessage, setCurrentStepMessage] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
  const [compareItem, setCompareItem] = useState<ProcessedImageItem | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(true);

  const tr = t(lang);

  const allCompleted = items.length > 0 && items.every((i) => i.status === 'success');

  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.resultUrl) URL.revokeObjectURL(target.resultUrl);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleApplyToAll = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        settings: { ...globalSettings },
      }))
    );
  };

  const handleStartProcessing = async () => {
    if (isProcessing || items.length === 0) return;
    setIsProcessing(true);
    setOverallProgress(0);

    const total = items.length;

    for (let i = 0; i < items.length; i++) {
      const current = items[i];
      setCurrentProcessingIndex(i + 1);
      setCurrentProcessingFile(current.name);

      setItems((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, status: 'processing', progress: 0 } : item))
      );

      try {
        const result = await processSingleImage(current, (prog, step) => {
          setCurrentStepMessage(step);
          const itemPortion = (i / total) * 100;
          const currentContribution = (prog / 100) * (100 / total);
          setOverallProgress(Math.min(99, itemPortion + currentContribution));

          setItems((prev) =>
            prev.map((item, idx) => (idx === i ? { ...item, progress: prog } : item))
          );
        });

        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: 'success',
                  progress: 100,
                  resultBlob: result.blob,
                  resultUrl: result.url,
                  resultSize: result.size,
                  resultDimensions: result.dimensions,
                  resultFormat: result.format,
                  savedPercent: result.savedPercent,
                  targetAchieved: result.targetAchieved,
                }
              : item
          )
        );
      } catch (err: any) {
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: 'error',
                  progress: 0,
                  errorMessage: err?.message || 'Processing error occurred.',
                }
              : item
          )
        );
      }

      await new Promise((r) => setTimeout(r, 40));
    }

    setOverallProgress(100);
    setIsProcessing(false);
  };

  const handleDownloadAllZip = async () => {
    setIsZipping(true);
    try {
      await downloadAllAsZip(items, 'pajoeit-optimized-images.zip');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {tr.selectedImagesCount(items.length)}
              </h2>
              {allCompleted && (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {tr.done}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {tr.pipelineSub}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{showSettingsDrawer ? tr.hideSettings : tr.configureSettings}</span>
          </button>

          <button
            onClick={onClearAll}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-800/50 transition disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{tr.clearAll}</span>
          </button>
        </div>
      </div>

      {/* Visual Workflow Pipeline Banner */}
      <WorkflowBar settings={globalSettings} fileCount={items.length} />

      {/* Expandable Settings Panel */}
      {showSettingsDrawer && (
        <SettingsPanel
          settings={globalSettings}
          onChange={setGlobalSettings}
          onApplyToAll={handleApplyToAll}
          fileCount={items.length}
        />
      )}

      {/* Processing Animated Overlay */}
      {isProcessing && (
        <ProcessingOverlay
          currentIndex={currentProcessingIndex}
          totalCount={items.length}
          currentFileName={currentProcessingFile}
          stepMessage={currentStepMessage}
          overallProgress={overallProgress}
        />
      )}

      {/* Completed Results Panel */}
      {allCompleted && (
        <ResultsPanel
          items={items}
          onDownloadZip={handleDownloadAllZip}
          onReset={onClearAll}
          isZipping={isZipping}
        />
      )}

      {/* File Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span>{tr.selectedImagesCount(items.length).toUpperCase()}</span>
          <span>{tr.dimensions.toUpperCase()}</span>
        </div>

        <div className="space-y-2.5">
          {items.map((item) => (
            <FileCard
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onOpenCompare={(target) => setCompareItem(target)}
            />
          ))}
        </div>

        {/* Compact dropzone to add more files */}
        <div className="pt-2">
          <Dropzone compact onFilesSelected={onAddFiles} lang={lang} />
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      {!allCompleted && (
        <div className="sticky bottom-4 z-30 rounded-2xl border border-slate-300 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/90 p-4 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>
              {tr.readyToProcess(items.length)}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleStartProcessing}
              disabled={isProcessing}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-indigo-500 hover:shadow-cyan-500/40 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{tr.processing}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{tr.processFiles(items.length)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Draggable Before / After Modal */}
      {compareItem && (
        <BeforeAfterModal
          item={compareItem}
          onClose={() => setCompareItem(null)}
        />
      )}
    </div>
  );
};
