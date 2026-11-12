import React from 'react';
import { X, Check } from 'lucide-react';
import { CATEGORIES } from '../data/staysData.ts';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  selectedAmenities: string[];
  onToggleAmenity: (amenityId: string) => void;
  onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onMaxPriceChange,
  selectedAmenities,
  onToggleAmenity,
  onReset,
}) => {
  if (!isOpen) return null;

  const amenityOptions = [
    { id: 'sauna', label: 'Sauna & Thermal Bath' },
    { id: 'pool', label: 'Infinity or Plunge Pool' },
    { id: 'ev', label: 'EV Charger' },
    { id: 'fireplace', label: 'Cast Iron Fireplace' },
    { id: 'wifi', label: 'High-speed Starlink Wi-Fi' },
    { id: 'view', label: 'Fjord or Oceanfront View' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
            Filters & Architecture
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="py-4 border-b border-stone-100 dark:border-stone-800">
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">
            Landscape & Setting
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="py-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">
              Maximum Nightly Rate
            </label>
            <span className="text-sm font-bold tabular-nums text-stone-900 dark:text-stone-100">
              ${maxPrice} / night
            </span>
          </div>
          <input
            type="range"
            min={300}
            max={1200}
            step={25}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="mt-3 w-full accent-stone-900 dark:accent-stone-100"
          />
          <div className="mt-1 flex justify-between text-[11px] text-stone-400 tabular-nums">
            <span>$300</span>
            <span>$750</span>
            <span>$1,200+</span>
          </div>
        </div>

        {/* Amenities Selection */}
        <div className="py-4 border-b border-stone-100 dark:border-stone-800">
          <label className="text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">
            Sanctuary Features
          </label>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {amenityOptions.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity.id);
              return (
                <button
                  key={amenity.id}
                  onClick={() => onToggleAmenity(amenity.id)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium transition-colors text-left ${
                    isChecked
                      ? 'border-stone-900 bg-stone-50 text-stone-900 dark:border-stone-400 dark:bg-stone-800 dark:text-stone-100'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <span>{amenity.label}</span>
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      isChecked
                        ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                        : 'border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={onReset}
            className="text-xs font-semibold underline text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-stone-900 py-3 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
