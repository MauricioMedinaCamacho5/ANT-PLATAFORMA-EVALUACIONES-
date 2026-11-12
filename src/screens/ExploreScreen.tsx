import React, { useState } from 'react';
import { Search, SlidersHorizontal, Heart, Star, MapPin, Sparkles } from 'lucide-react';
import { Stay } from '../types/index.ts';
import { CATEGORIES } from '../data/staysData.ts';

interface ExploreScreenProps {
  stays: Stay[];
  onSelectStay: (stay: Stay) => void;
  onToggleSave: (stayId: string, e: React.MouseEvent) => void;
  onOpenFilters: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  stays,
  onSelectStay,
  onToggleSave,
  onOpenFilters,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const featuredStay = stays[0];

  return (
    <div className="pb-16 text-stone-900 dark:text-stone-100">
      {/* Top Search & Filter Bar */}
      <div className="p-4 sm:p-5">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search fjords, deserts, alpine cabins..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 w-full rounded-2xl border border-stone-200/90 bg-white pl-10 pr-4 text-xs font-medium text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-hidden dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 shadow-xs"
            />
          </div>
          <button
            onClick={onOpenFilters}
            aria-label="Filter stays"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 shadow-xs transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800/80 dark:text-stone-400 dark:hover:bg-stone-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Architectural Hero Spotlight */}
      {featuredStay && selectedCategory === 'All' && !searchQuery && (
        <div className="px-4 sm:px-5 mb-6">
          <div
            onClick={() => onSelectStay(featuredStay)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-stone-900 text-white shadow-xl transition-transform active:scale-[0.99]"
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              {!imgErrors[featuredStay.id] ? (
                <img
                  src={featuredStay.heroImage}
                  alt={featuredStay.title}
                  referrerPolicy="no-referrer"
                  onError={() => handleImgError(featuredStay.id)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-stone-800 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-stone-600" />
                </div>
              )}
              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              {/* Top Tag & Heart */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-amber-300">
                  <Sparkles className="h-3 w-3" />
                  <span>Curators' Pick of the Season</span>
                </div>
                <button
                  onClick={(e) => onToggleSave(featuredStay.id, e)}
                  aria-label="Save to wishlist"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white transition-colors hover:bg-black/60"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      featuredStay.isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'
                    }`}
                  />
                </button>
              </div>

              {/* Bottom Spotlight Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                  <span>{featuredStay.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredStay.country}</span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1 text-amber-300">
                    <Star className="h-3 w-3 fill-amber-300" />
                    <span className="tabular-nums font-semibold">{featuredStay.rating}</span>
                  </div>
                </div>
                <h3 className="mt-1 text-lg sm:text-xl font-bold font-display leading-tight">
                  {featuredStay.title}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-base font-bold tabular-nums text-white">
                      ${featuredStay.pricePerNight}
                    </span>
                    <span className="text-stone-300"> / night</span>
                  </div>
                  <span className="rounded-xl bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-900 shadow-xs hover:bg-stone-100 transition-colors">
                    Explore Stay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stays Grid Section */}
      <div className="px-4 sm:px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-display">
            Curated Architectural Escapes ({stays.length})
          </h2>
        </div>

        {stays.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              No sanctuaries match your criteria.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('All');
              }}
              className="mt-3 text-xs font-semibold underline text-stone-900 dark:text-stone-100"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {stays.map((stay) => (
              <div
                key={stay.id}
                onClick={() => onSelectStay(stay)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-stone-200/70 bg-white transition-all hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
              >
                {/* Stay Photo Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  {!imgErrors[stay.id] ? (
                    <img
                      src={stay.heroImage}
                      alt={stay.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImgError(stay.id)}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-stone-400">
                      <MapPin className="h-8 w-8" />
                    </div>
                  )}

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => onToggleSave(stay.id, e)}
                    aria-label={`Save ${stay.title}`}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-white transition-colors hover:bg-black/60"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        stay.isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'
                      }`}
                    />
                  </button>

                  {/* Category unboxed tag */}
                  <div className="absolute bottom-2.5 left-2.5 rounded-md bg-black/50 backdrop-blur-xs px-2 py-0.5 text-[10px] font-medium text-stone-200">
                    {stay.category}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3.5">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span className="truncate">{stay.location}, {stay.country}</span>
                    <div className="flex items-center gap-1 font-semibold text-stone-900 dark:text-stone-100 shrink-0">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="tabular-nums">{stay.rating}</span>
                      <span className="text-stone-400 font-normal">({stay.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="mt-1 text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors line-clamp-1">
                    {stay.title}
                  </h3>

                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                    {stay.tagline}
                  </p>

                  <div className="mt-2.5 flex items-baseline justify-between border-t border-stone-100 pt-2 dark:border-stone-800/80">
                    <div className="text-xs">
                      <span className="text-sm font-bold tabular-nums text-stone-900 dark:text-stone-100">
                        ${stay.pricePerNight}
                      </span>
                      <span className="text-stone-500 dark:text-stone-400"> / night</span>
                    </div>
                    <span className="text-[11px] font-medium text-stone-400">
                      {stay.specs.guests} guests · {stay.specs.bedrooms} bd
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
