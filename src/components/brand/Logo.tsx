import React from 'react';

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ compact = false, className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 3D Gradient P with forward arrow mark */}
      <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#0c1a30] to-[#040814] p-1.5 shadow-md shadow-blue-500/10 border border-slate-700/60 dark:border-slate-800">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="p-arc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="p-stem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Left Ribbon Stem */}
          <path
            d="M20 22 C 20 18, 25 15, 36 15 L 36 82 C 26 82, 20 74, 20 62 Z"
            fill="url(#p-stem)"
          />

          {/* Curved P Loop */}
          <path
            d="M36 15 C 64 15, 86 26, 86 48 C 86 68, 64 78, 36 78 L 36 60 C 52 60, 66 56, 66 48 C 66 38, 52 33, 36 33 Z"
            fill="url(#p-arc)"
          />

          {/* Sharp Forward Arrow Inside Counter */}
          <path
            d="M44 42 H 58 V 34 L 72 48 L 58 62 V 54 H 44 Z"
            fill="#38bdf8"
          />
        </svg>
      </div>

      {!compact && (
        <div className="flex flex-col text-left rtl:text-right">
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase font-mono leading-none">
            PAJOEIT
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              CONVERT
            </span>
            <span className="inline-block rounded bg-cyan-500/10 px-1 py-0.2 text-[8px] font-mono font-bold text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              FREE
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
