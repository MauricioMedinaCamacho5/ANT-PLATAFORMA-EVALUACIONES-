import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  screenTitle?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, screenTitle }) => {
  return (
    <div className="relative mx-auto flex flex-col items-center">
      {screenTitle && (
        <div className="mb-3 text-center">
          <span className="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">
            {screenTitle}
          </span>
        </div>
      )}

      {/* Outer Titanium Chassis */}
      <div className="relative w-[385px] sm:w-[412px] h-[840px] rounded-[50px] p-[10px] bg-stone-800 dark:bg-stone-900 shadow-2xl ring-1 ring-stone-900/10 dark:ring-white/10 transition-all">
        {/* Subtle Side Button Outlines on Frame */}
        <div className="absolute -left-[13px] top-[115px] h-9 w-[3px] rounded-l-sm bg-stone-700 dark:bg-stone-600" />
        <div className="absolute -left-[13px] top-[165px] h-12 w-[3px] rounded-l-sm bg-stone-700 dark:bg-stone-600" />
        <div className="absolute -left-[13px] top-[225px] h-12 w-[3px] rounded-l-sm bg-stone-700 dark:bg-stone-600" />
        <div className="absolute -right-[13px] top-[150px] h-16 w-[3px] rounded-r-sm bg-stone-700 dark:bg-stone-600" />

        {/* Inner Glass Display Bezel */}
        <div className="relative flex flex-col h-full w-full overflow-hidden rounded-[42px] bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 ring-1 ring-black/5">
          {/* iOS Status Bar */}
          <div className="relative z-50 flex h-11 w-full shrink-0 items-center justify-between px-7 pt-2 select-none bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xs">
            {/* Clock */}
            <span className="text-xs font-semibold tracking-tight tabular-nums text-stone-800 dark:text-stone-200">
              9:41
            </span>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-2.5 h-[26px] w-[98px] -translate-x-1/2 rounded-full bg-black flex items-center justify-between px-2.5 transition-all">
              <div className="h-2.5 w-2.5 rounded-full bg-stone-900 ring-1 ring-stone-800" />
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                <div className="h-2 w-2 rounded-full bg-stone-900 ring-1 ring-stone-800" />
              </div>
            </div>

            {/* Cellular, Wi-Fi, Battery */}
            <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
              <div className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 h-1 bg-current rounded-xs" />
                <span className="w-0.5 h-1.5 bg-current rounded-xs" />
                <span className="w-0.5 h-2 bg-current rounded-xs" />
                <span className="w-0.5 h-2.5 bg-current rounded-xs" />
              </div>
              <Wifi className="h-3 w-3 stroke-[2.2]" />
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-semibold tabular-nums">98%</span>
                <Battery className="h-3.5 w-3.5 stroke-[2]" />
              </div>
            </div>
          </div>

          {/* Screen Body Content */}
          <div className="relative flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="relative z-50 flex h-4 w-full shrink-0 items-center justify-center bg-transparent pointer-events-none pb-1">
            <div className="h-1 w-32 rounded-full bg-stone-400 dark:bg-stone-600 opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
};
