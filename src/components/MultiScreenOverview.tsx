import React from 'react';
import { DeviceFrame } from './DeviceFrame.tsx';
import { BottomNavBar } from './BottomNavBar.tsx';
import { ExploreScreen } from '../screens/ExploreScreen.tsx';
import { DetailScreen } from '../screens/DetailScreen.tsx';
import { BookingScreen } from '../screens/BookingScreen.tsx';
import { TripsScreen } from '../screens/TripsScreen.tsx';
import { WishlistScreen } from '../screens/WishlistScreen.tsx';
import { Stay, BookingDetails, ScreenId } from '../types/index.ts';
import { Maximize2, ExternalLink } from 'lucide-react';

interface MultiScreenOverviewProps {
  stays: Stay[];
  selectedStay: Stay;
  onSelectStay: (stay: Stay) => void;
  onToggleSave: (stayId: string, e: React.MouseEvent) => void;
  onOpenFilters: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onProceedToBooking: (stay: Stay, nights: number, guests: number, checkIn: string, checkOut: string) => void;
  booking: BookingDetails | null;
  onConfirmBooking: (b: BookingDetails) => void;
  onZoomScreen: (screenId: ScreenId) => void;
  savedCount: number;
}

export const MultiScreenOverview: React.FC<MultiScreenOverviewProps> = ({
  stays,
  selectedStay,
  onSelectStay,
  onToggleSave,
  onOpenFilters,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onProceedToBooking,
  booking,
  onConfirmBooking,
  onZoomScreen,
  savedCount,
}) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Studio Header Banner */}
      <div className="mx-auto max-w-7xl mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6 dark:border-stone-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Multi-Screen Studio Canvas
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-stone-100">
            Interactive Screen Ecosystem
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl">
            Live interactive preview of all application screens side-by-side. Interact with any screen directly or tap "Focus Screen" to enter focused device view.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            5 Active Production Screens
          </span>
        </div>
      </div>

      {/* Horizontal Multi-Screen Presentation Strip */}
      <div className="flex gap-8 overflow-x-auto pb-12 pt-2 px-2 no-scrollbar snap-x">
        {/* Screen 1: Explore Feed */}
        <div className="flex-none snap-center flex flex-col items-center">
          <div className="mb-3 flex items-center justify-between w-[385px] px-2">
            <div>
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Screen 01 · Explore & Discovery
              </span>
              <p className="text-[10px] text-stone-400">Search, categories, hero stay, listings</p>
            </div>
            <button
              onClick={() => onZoomScreen('explore')}
              className="flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200"
            >
              <Maximize2 className="h-3 w-3" />
              <span>Focus</span>
            </button>
          </div>
          <DeviceFrame>
            <div className="flex flex-col h-full justify-between">
              <ExploreScreen
                stays={stays}
                onSelectStay={onSelectStay}
                onToggleSave={onToggleSave}
                onOpenFilters={onOpenFilters}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
              />
              <BottomNavBar
                currentScreen="explore"
                onScreenChange={onZoomScreen}
                savedCount={savedCount}
                hasActiveTrip={!!booking}
              />
            </div>
          </DeviceFrame>
        </div>

        {/* Screen 2: Stay Story & Details */}
        <div className="flex-none snap-center flex flex-col items-center">
          <div className="mb-3 flex items-center justify-between w-[385px] px-2">
            <div>
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Screen 02 · Stay Details & Story
              </span>
              <p className="text-[10px] text-stone-400">Gallery, amenities, pricing calculator, reviews</p>
            </div>
            <button
              onClick={() => onZoomScreen('detail')}
              className="flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200"
            >
              <Maximize2 className="h-3 w-3" />
              <span>Focus</span>
            </button>
          </div>
          <DeviceFrame>
            <div className="flex flex-col h-full justify-between">
              <DetailScreen
                stay={selectedStay}
                onBack={() => onZoomScreen('explore')}
                onToggleSave={onToggleSave}
                onProceedToBooking={onProceedToBooking}
              />
              <BottomNavBar
                currentScreen="detail"
                onScreenChange={onZoomScreen}
                savedCount={savedCount}
                hasActiveTrip={!!booking}
              />
            </div>
          </DeviceFrame>
        </div>

        {/* Screen 3: Reserve & Checkout */}
        <div className="flex-none snap-center flex flex-col items-center">
          <div className="mb-3 flex items-center justify-between w-[385px] px-2">
            <div>
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Screen 03 · Reserve & Payment
              </span>
              <p className="text-[10px] text-stone-400">Checkout parameters, payment options</p>
            </div>
            <button
              onClick={() => onZoomScreen('booking')}
              className="flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200"
            >
              <Maximize2 className="h-3 w-3" />
              <span>Focus</span>
            </button>
          </div>
          <DeviceFrame>
            <div className="flex flex-col h-full justify-between">
              <BookingScreen
                stay={selectedStay}
                nights={4}
                guests={2}
                checkIn="Nov 18, 2026"
                checkOut="Nov 22, 2026"
                onBack={() => onZoomScreen('detail')}
                onConfirmBooking={onConfirmBooking}
              />
              <BottomNavBar
                currentScreen="booking"
                onScreenChange={onZoomScreen}
                savedCount={savedCount}
                hasActiveTrip={!!booking}
              />
            </div>
          </DeviceFrame>
        </div>

        {/* Screen 4: Trips & Keyless Entry */}
        <div className="flex-none snap-center flex flex-col items-center">
          <div className="mb-3 flex items-center justify-between w-[385px] px-2">
            <div>
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Screen 04 · Trips & Itinerary
              </span>
              <p className="text-[10px] text-stone-400">PIN access, day-by-day planner, packing list</p>
            </div>
            <button
              onClick={() => onZoomScreen('trips')}
              className="flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200"
            >
              <Maximize2 className="h-3 w-3" />
              <span>Focus</span>
            </button>
          </div>
          <DeviceFrame>
            <div className="flex flex-col h-full justify-between">
              <TripsScreen
                booking={booking}
                onExploreMore={() => onZoomScreen('explore')}
              />
              <BottomNavBar
                currentScreen="trips"
                onScreenChange={onZoomScreen}
                savedCount={savedCount}
                hasActiveTrip={!!booking}
              />
            </div>
          </DeviceFrame>
        </div>

        {/* Screen 5: Saved Wishlists & Map */}
        <div className="flex-none snap-center flex flex-col items-center">
          <div className="mb-3 flex items-center justify-between w-[385px] px-2">
            <div>
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Screen 05 · Saved & Coordinates
              </span>
              <p className="text-[10px] text-stone-400">Saved stays, interactive pin coordinates map</p>
            </div>
            <button
              onClick={() => onZoomScreen('wishlist')}
              className="flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200"
            >
              <Maximize2 className="h-3 w-3" />
              <span>Focus</span>
            </button>
          </div>
          <DeviceFrame>
            <div className="flex flex-col h-full justify-between">
              <WishlistScreen
                stays={stays}
                onSelectStay={onSelectStay}
                onToggleSave={onToggleSave}
              />
              <BottomNavBar
                currentScreen="wishlist"
                onScreenChange={onZoomScreen}
                savedCount={savedCount}
                hasActiveTrip={!!booking}
              />
            </div>
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
};
