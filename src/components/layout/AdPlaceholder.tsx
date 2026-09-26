import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal-banner' | 'rectangle' | 'responsive';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = 'pajoeit-ad-slot-default',
  format = 'horizontal-banner',
  className = '',
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-slate-500 transition hover:border-slate-700/60 ${className}`}
      data-ad-slot={slotId}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center p-3 text-center">
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-600">
          Advertisement Placeholder
        </span>
        <p className="mt-1 text-[11px] text-slate-600 max-w-sm">
          Clean non-intrusive sponsor unit ready for AdSense / Carbon Ads
        </p>
      </div>
    </div>
  );
};
