import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from './usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl border border-amber-500/40 bg-slate-900/95 px-4 py-2 text-xs font-medium text-amber-300 shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-2">
      <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
      <span>Offline Mode active — 100% of processing happens locally in your browser!</span>
    </div>
  );
};
