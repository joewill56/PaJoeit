import React from 'react';

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ compact = false, className = '' }) => {
  if (compact) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src="/assets/pajoeit-convert-icon.png"
          alt="PAJOEIT CONVERT"
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl object-contain shadow-md shadow-blue-500/10 border border-slate-700/40 dark:border-slate-800"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/assets/pajoeit-convert-logo.png"
        alt="PAJOEIT CONVERT"
        className="h-9 sm:h-10 w-auto max-w-[200px] sm:max-w-[230px] object-contain"
        loading="eager"
      />
    </div>
  );
};
