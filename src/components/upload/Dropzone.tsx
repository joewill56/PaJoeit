import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, FileCheck, Plus } from 'lucide-react';
import { isSupportedImageFile } from '../../lib/image-engine/file-utils';
import { LanguageCode } from '../../lib/i18n/languages';
import { t } from '../../lib/i18n/translations';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  compact?: boolean;
  acceptedFormatsText?: string;
  lang?: LanguageCode;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  compact = false,
  acceptedFormatsText = 'JPG • PNG • WebP • GIF • AVIF',
  lang = 'en',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tr = t(lang);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFileList = (fileList: FileList | File[]) => {
    const validFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (isSupportedImageFile(file)) {
        validFiles.push(file);
      }
    }
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFileList(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFileList(e.target.files);
      e.target.value = '';
    }
  };

  // Support clipboard paste (Cmd+V / Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const files: File[] = [];
        for (let i = 0; i < e.clipboardData.files.length; i++) {
          const f = e.clipboardData.files[i];
          if (isSupportedImageFile(f)) {
            files.push(f);
          }
        }
        if (files.length > 0) {
          onFilesSelected(files);
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFilesSelected]);

  if (compact) {
    return (
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-3 text-xs font-semibold transition ${
          isDragOver
            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300'
            : 'border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.webp,.png,.jpg,.jpeg,.gif,.bmp,.avif"
          onChange={handleInputChange}
          className="hidden"
        />
        <Plus className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        <span>{tr.addMoreImages}</span>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 shadow-sm ${
        isDragOver
          ? 'scale-[1.01] border-cyan-500 bg-cyan-50/70 dark:bg-gradient-to-b dark:from-cyan-950/40 dark:via-indigo-950/20 dark:to-slate-900 shadow-2xl shadow-cyan-500/20 ring-4 ring-cyan-500/20'
          : 'border-slate-300 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/60 hover:border-cyan-500/60 hover:bg-white dark:hover:bg-slate-900/80 hover:shadow-xl hover:shadow-cyan-500/5'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
      aria-label="Upload images dropzone"
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.webp,.png,.jpg,.jpeg,.gif,.bmp,.avif"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Pulsing ambient backdrop on hover/drag */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-cyan-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Upload Icon Container */}
      <div
        className={`mb-5 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 ${
          isDragOver
            ? 'scale-110 bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/40 animate-pulse'
            : 'bg-slate-100 dark:bg-slate-800/90 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 group-hover:bg-gradient-to-tr group-hover:from-cyan-500 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-md'
        }`}
      >
        <UploadCloud className="h-10 w-10 transition-transform duration-300" />
      </div>

      {/* Primary instructional text */}
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
        {isDragOver ? (
          <span className="text-cyan-600 dark:text-cyan-400 animate-pulse">{tr.dropzoneDragOver}</span>
        ) : (
          tr.dropzoneTitle
        )}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {isDragOver ? tr.dropzoneSubDragOver : tr.dropzoneSub}
      </p>

      {/* Call to action button */}
      <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:from-cyan-400 group-hover:to-indigo-500 transition-all duration-200">
        <ImageIcon className="w-4 h-4" />
        <span>{tr.chooseFiles}</span>
      </div>

      {/* Supported formats & trust badge */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-mono uppercase tracking-wider font-semibold">
          {acceptedFormatsText}
        </span>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <FileCheck className="w-3.5 h-3.5" /> 100% Private (No Uploads)
        </span>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <span className="hidden sm:inline">{tr.pasteSupport}</span>
      </div>
    </div>
  );
};
