import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Moon,
  Sun,
  Globe,
  Bell,
  CreditCard,
  Compass,
  Sparkles,
  ChevronRight,
  Check,
} from 'lucide-react';

interface ProfileScreenProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigateToScreen: (screenId: any) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  isDark,
  onToggleTheme,
  onNavigateToScreen,
}) => {
  const [currency, setCurrency] = useState('USD');
  const [notifications, setNotifications] = useState(true);
  const [isHostMode, setIsHostMode] = useState(false);

  return (
    <div className="pb-20 text-stone-900 dark:text-stone-100">
      {/* Profile Header Card */}
      <div className="p-4 sm:p-5 border-b border-stone-200/70 dark:border-stone-800">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Elena Rostova"
              referrerPolicy="no-referrer"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-stone-900/10 dark:ring-white/10"
            />
            <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white dark:ring-stone-900">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold font-display text-stone-900 dark:text-stone-100">
                Elena Rostova
              </h1>
              <span title="Identity Verified">
                <ShieldCheck className="h-4 w-4 text-amber-500" />
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              elena.rostova@designworks.io
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-amber-700 dark:text-amber-400">
              <Sparkles className="h-3 w-3" />
              <span>Aether Connoisseur · Tier 3</span>
            </div>
          </div>
        </div>

        {/* Traveler Stats Strip */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-stone-100/70 p-3 text-center dark:bg-stone-900/80">
          <div>
            <span className="block text-sm font-bold tabular-nums text-stone-900 dark:text-stone-100">
              14
            </span>
            <span className="text-[10px] text-stone-400 uppercase font-medium">Stays</span>
          </div>
          <div className="border-x border-stone-200 dark:border-stone-800">
            <span className="block text-sm font-bold tabular-nums text-stone-900 dark:text-stone-100">
              8
            </span>
            <span className="text-[10px] text-stone-400 uppercase font-medium">Countries</span>
          </div>
          <div>
            <span className="block text-sm font-bold tabular-nums text-stone-900 dark:text-stone-100">
              100%
            </span>
            <span className="text-[10px] text-stone-400 uppercase font-medium">Offset CO₂</span>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="p-4 sm:p-5 space-y-5 text-xs">
        {/* Host Mode Switch Banner */}
        <div className="rounded-2xl border border-stone-200 bg-stone-900 p-4 text-white dark:border-stone-800 dark:bg-stone-900 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Compass className="h-4 w-4 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-display">Architectural Host Portal</h3>
                <p className="text-[11px] text-stone-400">List an exceptional retreat or cabin</p>
              </div>
            </div>
            <button
              onClick={() => setIsHostMode(!isHostMode)}
              className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-900 hover:bg-stone-100"
            >
              {isHostMode ? 'Active' : 'Switch Mode'}
            </button>
          </div>
          {isHostMode && (
            <p className="mt-2 text-[11px] text-amber-200 bg-black/30 p-2 rounded-lg">
              Host Mode enabled: Showing host analytics, guest inquiries, and calendar booking blocks.
            </p>
          )}
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            App Preferences & Display
          </h2>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5 text-stone-700 dark:text-stone-300">
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>Dark Appearance</span>
            </div>
            <button
              onClick={onToggleTheme}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isDark ? 'bg-stone-900 dark:bg-amber-400' : 'bg-stone-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Currency */}
          <div className="flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800">
            <div className="flex items-center gap-2.5 text-stone-700 dark:text-stone-300">
              <Globe className="h-4 w-4" />
              <span>Currency Display</span>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-xs font-semibold text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800">
            <div className="flex items-center gap-2.5 text-stone-700 dark:text-stone-300">
              <Bell className="h-4 w-4" />
              <span>Push Itinerary Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                notifications ? 'bg-stone-900 dark:bg-amber-400' : 'bg-stone-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-2xl border border-stone-200 bg-white p-2 dark:border-stone-800 dark:bg-stone-900 divide-y divide-stone-100 dark:divide-stone-800">
          <button
            onClick={() => onNavigateToScreen('trips')}
            className="flex w-full items-center justify-between p-2.5 text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
          >
            <span>Active Reservations & Smart Pass</span>
            <ChevronRight className="h-4 w-4 text-stone-400" />
          </button>
          <button
            onClick={() => onNavigateToScreen('wishlist')}
            className="flex w-full items-center justify-between p-2.5 text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
          >
            <span>Saved Collections & Pins</span>
            <ChevronRight className="h-4 w-4 text-stone-400" />
          </button>
          <button
            onClick={() => onNavigateToScreen('explore')}
            className="flex w-full items-center justify-between p-2.5 text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
          >
            <span>Explore New Sanctuaries</span>
            <ChevronRight className="h-4 w-4 text-stone-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
