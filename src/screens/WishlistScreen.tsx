import React, { useState } from 'react';
import { Heart, Star, MapPin, Map as MapIcon, Grid, Share2, Compass, Check } from 'lucide-react';
import { Stay } from '../types/index.ts';

interface WishlistScreenProps {
  stays: Stay[];
  onSelectStay: (stay: Stay) => void;
  onToggleSave: (stayId: string, e: React.MouseEvent) => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  stays,
  onSelectStay,
  onToggleSave,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedPinStay, setSelectedPinStay] = useState<Stay | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const savedStays = stays.filter((s) => s.isSaved);

  const handleShareCollection = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Mock geographical positions for the interactive pin map (percentages)
  const pinCoordinates: Record<string, { x: number; y: number }> = {
    'stay-sognefjord-glasshouse': { x: 52, y: 22 },
    'stay-kyoto-ryokan': { x: 82, y: 44 },
    'stay-joshua-mirage': { x: 22, y: 42 },
    'stay-amalfi-solaria': { x: 53, y: 38 },
    'stay-dolomites-alpine': { x: 51, y: 34 },
    'stay-tulum-brutalist': { x: 26, y: 52 },
  };

  return (
    <div className="pb-20 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-stone-200/70 dark:border-stone-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold font-display text-stone-900 dark:text-stone-100">
              Saved Wishlists
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {savedStays.length} architectural escapes curated
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            <div className="flex rounded-lg border border-stone-200 bg-stone-100 p-0.5 dark:border-stone-800 dark:bg-stone-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs dark:bg-stone-700 dark:text-stone-100'
                    : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
                }`}
                title="Grid View"
              >
                <Grid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-stone-900 shadow-xs dark:bg-stone-700 dark:text-stone-100'
                    : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
                }`}
                title="Interactive Map Pin View"
              >
                <MapIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={handleShareCollection}
              aria-label="Share wishlist collection"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {savedStays.length === 0 ? (
          <div className="py-16 text-center">
            <Heart className="mx-auto h-8 w-8 text-stone-300 dark:text-stone-700" />
            <p className="mt-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
              No sanctuaries saved yet.
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Tap the heart icon on any stay card while exploring.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {savedStays.map((stay) => (
              <div
                key={stay.id}
                onClick={() => onSelectStay(stay)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs hover:shadow-md transition-all dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={stay.heroImage}
                    alt={stay.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => onToggleSave(stay.id, e)}
                    className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-rose-500 hover:bg-black/60"
                  >
                    <Heart className="h-4 w-4 fill-rose-500" />
                  </button>
                  <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white">
                    {stay.category}
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{stay.location}, {stay.country}</span>
                    <div className="flex items-center gap-1 font-semibold text-stone-900 dark:text-stone-100">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="tabular-nums">{stay.rating}</span>
                    </div>
                  </div>
                  <h3 className="mt-1 text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {stay.title}
                  </h3>
                  <div className="mt-2 flex items-baseline justify-between border-t border-stone-100 pt-2 dark:border-stone-800 text-xs">
                    <div>
                      <span className="font-bold tabular-nums text-stone-900 dark:text-stone-100">
                        ${stay.pricePerNight}
                      </span>
                      <span className="text-stone-400"> / night</span>
                    </div>
                    <span className="text-[11px] font-semibold text-stone-900 dark:text-stone-100 group-hover:underline">
                      View Stay →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Interactive Stylized World / Regional Pin Map */
          <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 p-4 shadow-inner dark:border-stone-800 min-h-[420px] flex flex-col justify-between">
            {/* Map Background SVG outlines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 1000 500" className="w-full h-full text-stone-400 fill-current">
                {/* Stylized geometric continental outlines */}
                <path d="M150 120 Q 220 80, 300 130 T 260 250 T 180 200 Z" />
                <path d="M220 280 Q 280 290, 310 380 T 250 450 T 200 350 Z" />
                <path d="M480 80 Q 560 60, 620 120 T 540 220 T 460 160 Z" />
                <path d="M480 230 Q 580 250, 600 380 T 520 460 T 450 320 Z" />
                <path d="M640 100 Q 820 80, 880 180 T 780 300 T 660 200 Z" />
                <path d="M780 340 Q 880 330, 870 420 T 800 450 Z" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-stone-300">
              <span className="font-semibold uppercase tracking-wider text-[10px] text-amber-400">
                Aether Coordinates Projection
              </span>
              <span>Tap a pin to preview</span>
            </div>

            {/* Interactive Pins on Map */}
            <div className="relative z-10 my-auto h-64 w-full">
              {savedStays.map((stay) => {
                const coords = pinCoordinates[stay.id] || { x: 50, y: 50 };
                const isSelected = selectedPinStay?.id === stay.id;
                return (
                  <button
                    key={stay.id}
                    onClick={() => setSelectedPinStay(stay)}
                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-hidden"
                  >
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-transform ${
                        isSelected
                          ? 'scale-125 bg-amber-400 text-stone-950 ring-4 ring-amber-400/30'
                          : 'bg-white text-stone-900 shadow-md group-hover:scale-110'
                      } px-2 py-1 text-[10px] font-bold`}
                    >
                      <span>${stay.pricePerNight}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Pin Bottom Card */}
            {selectedPinStay ? (
              <div
                onClick={() => onSelectStay(selectedPinStay)}
                className="relative z-20 cursor-pointer rounded-xl bg-white/95 backdrop-blur-md p-3 text-stone-900 shadow-xl transition-all"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={selectedPinStay.heroImage}
                    alt={selectedPinStay.title}
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold">
                      {selectedPinStay.location}, {selectedPinStay.country}
                    </span>
                    <h4 className="text-xs font-bold leading-tight line-clamp-1">
                      {selectedPinStay.title}
                    </h4>
                    <span className="text-xs font-bold text-amber-700">
                      ${selectedPinStay.pricePerNight} / night
                    </span>
                  </div>
                  <span className="rounded-lg bg-stone-900 px-3 py-1.5 text-[11px] font-semibold text-white">
                    Open
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative z-10 text-center text-[11px] text-stone-400">
                Select any location badge on the coordinates map
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
