import React from 'react';
import { Compass, Sparkles, CreditCard, CalendarCheck, Heart, User } from 'lucide-react';
import { ScreenId } from '../types/index.ts';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  savedCount: number;
  hasActiveTrip: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onScreenChange,
  savedCount,
  hasActiveTrip,
}) => {
  const tabs = [
    { id: 'explore' as ScreenId, label: 'Explore', icon: Compass },
    { id: 'detail' as ScreenId, label: 'Stay', icon: Sparkles },
    { id: 'booking' as ScreenId, label: 'Reserve', icon: CreditCard },
    { id: 'trips' as ScreenId, label: 'Trips', icon: CalendarCheck, badge: hasActiveTrip ? '1' : undefined },
    { id: 'wishlist' as ScreenId, label: 'Saved', icon: Heart, badge: savedCount > 0 ? `${savedCount}` : undefined },
    { id: 'profile' as ScreenId, label: 'Profile', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="sticky bottom-0 z-40 w-full border-t border-stone-200/80 bg-white/95 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-900/95"
    >
      <div className="grid grid-cols-6 items-center px-1 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onScreenChange(tab.id)}
              className={`relative flex min-h-[48px] min-w-[44px] flex-col items-center justify-center rounded-xl py-1 text-center transition-colors ${
                isActive
                  ? 'text-stone-900 dark:text-stone-100 font-semibold'
                  : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-stone-900 px-1 text-[9px] font-bold text-white dark:bg-amber-400 dark:text-stone-950 tabular-nums">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[10px] tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 h-0.5 w-4 rounded-full bg-stone-900 dark:bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
