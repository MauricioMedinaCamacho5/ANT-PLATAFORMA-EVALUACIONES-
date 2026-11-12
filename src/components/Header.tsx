import React from 'react';
import { Smartphone, LayoutGrid, Monitor, Moon, Sun, Compass } from 'lucide-react';
import { ViewportMode, ScreenId } from '../types/index.ts';

interface HeaderProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  viewportMode: ViewportMode;
  onViewportModeChange: (mode: ViewportMode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onScreenChange,
  viewportMode,
  onViewportModeChange,
  isDark,
  onToggleTheme,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onScreenChange('explore')}
          className="group flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900">
            <Compass className="h-4 w-4" />
          </div>
          <span className="font-display tracking-widest text-sm uppercase">AETHER</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-stone-600 dark:text-stone-400">
          <button
            onClick={() => onScreenChange('explore')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 hover:text-stone-900 dark:hover:text-stone-100 ${
              currentScreen === 'explore'
                ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => onScreenChange('detail')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 hover:text-stone-900 dark:hover:text-stone-100 ${
              currentScreen === 'detail'
                ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            Stay Details
          </button>
          <button
            onClick={() => onScreenChange('booking')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 hover:text-stone-900 dark:hover:text-stone-100 ${
              currentScreen === 'booking'
                ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            Reservation
          </button>
          <button
            onClick={() => onScreenChange('trips')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 hover:text-stone-900 dark:hover:text-stone-100 ${
              currentScreen === 'trips'
                ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            Itinerary
          </button>
          <button
            onClick={() => onScreenChange('wishlist')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 hover:text-stone-900 dark:hover:text-stone-100 ${
              currentScreen === 'wishlist'
                ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            Saved {savedCount > 0 && <span className="tabular-nums">({savedCount})</span>}
          </button>
          <button
            onClick={() => onScreenChange('profile')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 hover:text-stone-900 dark:hover:text-stone-100 ${
              currentScreen === 'profile'
                ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100'
                : ''
            }`}
          >
            Profile
          </button>
        </nav>

        {/* Zone 3: 1 primary action & controls cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Viewport display switcher */}
          <div className="flex items-center rounded-lg border border-stone-200 bg-stone-100 p-0.5 dark:border-stone-800 dark:bg-stone-900">
            <button
              onClick={() => onViewportModeChange('mobile')}
              title="Mobile Device Mockup"
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                viewportMode === 'mobile'
                  ? 'bg-white text-stone-900 shadow-xs dark:bg-stone-800 dark:text-stone-100'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Phone</span>
            </button>
            <button
              onClick={() => onViewportModeChange('overview')}
              title="All Screens Side-by-Side Studio"
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                viewportMode === 'overview'
                  ? 'bg-white text-stone-900 shadow-xs dark:bg-stone-800 dark:text-stone-100'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All Screens</span>
            </button>
            <button
              onClick={() => onViewportModeChange('desktop')}
              title="Full-Screen Responsive View"
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                viewportMode === 'desktop'
                  ? 'bg-white text-stone-900 shadow-xs dark:bg-stone-800 dark:text-stone-100'
                  : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-stone-100 text-stone-700 transition-colors hover:bg-stone-200 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
