import React, { useState } from 'react';
import {
  Calendar,
  Key,
  MapPin,
  Check,
  Copy,
  Plus,
  Compass,
  Flame,
  Utensils,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { BookingDetails, ItineraryItem } from '../types/index.ts';
import { INITIAL_ITINERARY } from '../data/staysData.ts';

interface TripsScreenProps {
  booking: BookingDetails | null;
  onExploreMore: () => void;
}

export const TripsScreen: React.FC<TripsScreenProps> = ({ booking, onExploreMore }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(INITIAL_ITINERARY);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00');
  const [packingList, setPackingList] = useState([
    { id: 'pack-1', item: 'Thermal base layers & merino wool socks', checked: true },
    { id: 'pack-2', item: 'Gore-Tex waterproof trail hiking boots', checked: true },
    { id: 'pack-3', item: 'European Type F plug adapter', checked: false },
    { id: 'pack-4', item: 'Swimwear for fjord cold plunge & cedar sauna', checked: true },
    { id: 'pack-5', item: 'Camera tripod for northern lights & long exposures', checked: false },
  ]);

  const toggleItineraryCompletion = (id: string) => {
    setItinerary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const togglePackingItem = (id: string) => {
    setPackingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleCopyCode = () => {
    if (!booking) return;
    navigator.clipboard?.writeText(booking.accessCode);
    setIsCopiedCode(true);
    setTimeout(() => setIsCopiedCode(false), 2000);
  };

  const handleSimulateUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => setIsUnlocked(false), 3000);
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: ItineraryItem = {
      id: `itin-${Date.now()}`,
      day: activeDay,
      time: newTime,
      title: newTitle,
      location: booking ? booking.stay.title : 'Local Surroundings',
      category: 'adventure',
      notes: 'Added to travel itinerary.',
      completed: false,
    };
    setItinerary((prev) => [...prev, item]);
    setNewTitle('');
    setShowAddActivity(false);
  };

  const filteredItinerary = itinerary.filter((item) => item.day === activeDay);

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-stone-900 dark:text-stone-100 min-h-[500px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-500 mb-4">
          <Calendar className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-bold font-display">No Upcoming Escapes Yet</h2>
        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 max-w-xs">
          Explore our collection of secluded architectural sanctuaries and book your next escape.
        </p>
        <button
          onClick={onExploreMore}
          className="mt-5 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
        >
          Explore Stays
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 text-stone-900 dark:text-stone-100">
      {/* Top Banner with Booked Stay */}
      <div className="relative">
        <div className="relative h-60 w-full overflow-hidden bg-stone-900">
          <img
            src={booking.stay.heroImage}
            alt={booking.stay.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          {/* Top Badge */}
          <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-emerald-300 ring-1 ring-emerald-500/40">
              Confirmed Stay
            </span>
            <span className="font-mono text-[11px] text-stone-300 font-semibold">
              Ref: {booking.confirmationCode}
            </span>
          </div>

          {/* Stay Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[11px] font-medium text-stone-300 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {booking.stay.location}, {booking.stay.country}
            </span>
            <h1 className="mt-1 text-lg font-bold text-white font-display leading-tight">
              {booking.stay.title}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-xs text-stone-200">
              <span>{booking.checkIn} – {booking.checkOut}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{booking.nights} nights</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{booking.guests} guests</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-6">
        {/* Interactive Smart Lock Card */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Key className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  Keyless Pavilion Entry
                </h3>
                <p className="text-[10px] text-stone-400">Yale Smart Lock on Main Timber Portal</p>
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-[11px] font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
            >
              {isCopiedCode ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{isCopiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-stone-50 p-3 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
            <div>
              <span className="text-[10px] font-semibold text-stone-400 uppercase">PIN CODE</span>
              <p className="text-xl font-mono font-bold tracking-widest text-stone-900 dark:text-stone-100 tabular-nums">
                {booking.accessCode}
              </p>
            </div>
            <button
              onClick={handleSimulateUnlock}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                isUnlocked
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900'
              }`}
            >
              {isUnlocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
              <span>{isUnlocked ? 'Door Unlocked!' : 'Simulate Unlock'}</span>
            </button>
          </div>
        </div>

        {/* Day-by-Day Itinerary Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-display">
              Sanctuary Itinerary & Experiences
            </h2>
            <button
              onClick={() => setShowAddActivity(!showAddActivity)}
              className="flex items-center gap-1 text-xs font-semibold text-stone-900 dark:text-stone-100 hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Activity</span>
            </button>
          </div>

          {/* Add Activity Inline Form */}
          {showAddActivity && (
            <form onSubmit={handleAddActivity} className="mb-4 rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800/70 space-y-2">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                Add plan for Day {activeDay}
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Sunset Kayaking or Private Chef"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="flex-1 rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-xs text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100"
                />
                <input
                  type="text"
                  placeholder="14:00"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-16 rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-xs text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 text-center"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-stone-900 px-3 text-xs font-semibold text-white dark:bg-stone-100 dark:text-stone-900"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {/* Day Tabs */}
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
            {[1, 2, 3].map((dayNum) => (
              <button
                key={dayNum}
                onClick={() => setActiveDay(dayNum)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeDay === dayNum
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
                }`}
              >
                Day {dayNum}
              </button>
            ))}
          </div>

          {/* Activities List */}
          <div className="mt-3.5 space-y-2.5">
            {filteredItinerary.length === 0 ? (
              <p className="py-4 text-center text-xs text-stone-400">
                No activities planned for Day {activeDay} yet.
              </p>
            ) : (
              filteredItinerary.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItineraryCompletion(item.id)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                    item.completed
                      ? 'border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30 opacity-70'
                      : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      item.completed
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {item.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <h4
                        className={`font-semibold ${
                          item.completed
                            ? 'line-through text-stone-400 dark:text-stone-500'
                            : 'text-stone-900 dark:text-stone-100'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="font-mono text-[11px] text-stone-400 tabular-nums">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      {item.location}
                    </p>
                    {item.notes && (
                      <p className="mt-1 text-[11px] text-stone-600 dark:text-stone-300 leading-tight">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Essential Travel Packing Checklist */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
            Fjord Packing Checklist
          </h2>
          <div className="space-y-2">
            {packingList.map((pack) => (
              <div
                key={pack.id}
                onClick={() => togglePackingItem(pack.id)}
                className="flex cursor-pointer items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300"
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded border ${
                    pack.checked
                      ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                      : 'border-stone-300 dark:border-stone-700'
                  }`}
                >
                  {pack.checked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <span className={pack.checked ? 'line-through text-stone-400' : ''}>
                  {pack.item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
