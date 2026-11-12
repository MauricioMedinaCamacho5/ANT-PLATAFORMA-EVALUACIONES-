import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Flame,
  Wifi,
  Waves,
  Zap,
  Coffee,
  Trees,
  Utensils,
  Sparkles,
  Compass,
  Check,
  Calendar,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Stay, Review } from '../types/index.ts';
import { SAMPLE_REVIEWS } from '../data/staysData.ts';

interface DetailScreenProps {
  stay: Stay;
  onBack: () => void;
  onToggleSave: (stayId: string, e: React.MouseEvent) => void;
  onProceedToBooking: (stay: Stay, nights: number, guests: number, checkIn: string, checkOut: string) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  stay,
  onBack,
  onToggleSave,
  onProceedToBooking,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [nights, setNights] = useState(4);
  const [guests, setGuests] = useState(2);
  const [checkInDate] = useState('Nov 18, 2026');
  const [checkOutDate] = useState('Nov 22, 2026');
  const [isCopiedShare, setIsCopiedShare] = useState(false);

  // Icon mapping helper
  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="h-4 w-4" />;
      case 'Wifi': return <Wifi className="h-4 w-4" />;
      case 'Waves': return <Waves className="h-4 w-4" />;
      case 'Zap': return <Zap className="h-4 w-4" />;
      case 'Coffee': return <Coffee className="h-4 w-4" />;
      case 'Trees': return <Trees className="h-4 w-4" />;
      case 'Utensils': return <Utensils className="h-4 w-4" />;
      case 'Sparkles': return <Sparkles className="h-4 w-4" />;
      case 'Compass': return <Compass className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopiedShare(true);
    setTimeout(() => setIsCopiedShare(false), 2000);
  };

  const baseTotal = stay.pricePerNight * nights;
  const totalPrice = baseTotal + stay.cleaningFee + stay.serviceFee;

  return (
    <div className="pb-24 text-stone-900 dark:text-stone-100">
      {/* Top Floating Action Header */}
      <div className="relative w-full">
        {/* Gallery Image Display */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-900">
          <img
            src={stay.gallery[activeImageIndex] || stay.heroImage}
            alt={stay.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

          {/* Top Bar Navigation Buttons */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
            <button
              onClick={onBack}
              aria-label="Back to explore"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white transition-colors hover:bg-black/60"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                aria-label="Share property link"
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white transition-colors hover:bg-black/60"
              >
                {isCopiedShare ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                {isCopiedShare && (
                  <span className="absolute -bottom-7 right-0 rounded-md bg-stone-900 px-2 py-0.5 text-[10px] text-white whitespace-nowrap shadow-md">
                    Link copied!
                  </span>
                )}
              </button>
              <button
                onClick={(e) => onToggleSave(stay.id, e)}
                aria-label="Save stay"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white transition-colors hover:bg-black/60"
              >
                <Heart
                  className={`h-4 w-4 ${
                    stay.isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Gallery Carousel Thumbnails & Dots */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              {stay.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImageIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
            <span className="rounded-md bg-black/50 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono text-white tabular-nums">
              {activeImageIndex + 1} / {stay.gallery.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-4 sm:px-5 pt-4 space-y-6">
        {/* Title & Location Header */}
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-700 dark:text-stone-300">{stay.category}</span>
            <span aria-hidden="true">·</span>
            <span>{stay.location}, {stay.country}</span>
          </div>
          <h1 className="mt-1 text-xl sm:text-2xl font-bold font-display tracking-tight text-stone-900 dark:text-stone-100">
            {stay.title}
          </h1>
          <p className="mt-1 text-xs text-stone-600 dark:text-stone-300">
            {stay.tagline}
          </p>

          {/* Ratings & Specs Strip */}
          <div className="mt-3 flex flex-wrap items-center gap-3 border-y border-stone-200/70 py-2.5 text-xs text-stone-600 dark:border-stone-800 dark:text-stone-400">
            <div className="flex items-center gap-1 font-semibold text-stone-900 dark:text-stone-100">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums">{stay.rating}</span>
              <span className="font-normal text-stone-400">({stay.reviewCount} reviews)</span>
            </div>
            <span aria-hidden="true">·</span>
            <span>{stay.specs.guests} guests</span>
            <span aria-hidden="true">·</span>
            <span>{stay.specs.bedrooms} bedrooms</span>
            <span aria-hidden="true">·</span>
            <span>{stay.specs.baths} baths</span>
          </div>
        </div>

        {/* Host Profile Spotlight */}
        <div className="flex items-center justify-between rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3.5 dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex items-center gap-3">
            <img
              src={stay.host.avatar}
              alt={stay.host.name}
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  Hosted by {stay.host.name}
                </span>
                {stay.host.isSuperhost && (
                  <span title="Superhost Verified">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Responds {stay.host.responseTime} · {stay.host.joined}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
            {stay.host.responseRate} rate
          </span>
        </div>

        {/* Architectural Narrative */}
        {stay.architectNote && (
          <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 dark:text-amber-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>Architectural Curation Note</span>
            </div>
            <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-200/80 italic">
              "{stay.architectNote}"
            </p>
          </div>
        )}

        {/* About the Space */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            The Residence
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            {stay.description}
          </p>
        </div>

        {/* Sanctuary Amenities */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Amenities & Features
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {stay.amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex items-start gap-3 rounded-xl border border-stone-200/60 bg-white p-3 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                  {renderAmenityIcon(amenity.icon)}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    {amenity.name}
                  </h3>
                  {amenity.description && (
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                      {amenity.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Reservation Box */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-bold tabular-nums text-stone-900 dark:text-stone-100">
                ${stay.pricePerNight}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400"> / night</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                {stay.rating}
              </span>
            </div>
          </div>

          {/* Interactive Date & Guests Selector */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-stone-200 p-2.5 dark:border-stone-800">
              <span className="text-[10px] font-semibold text-stone-400 uppercase">Dates</span>
              <div className="mt-0.5 flex items-center gap-1.5 font-medium text-stone-900 dark:text-stone-100">
                <Calendar className="h-3 w-3 text-stone-400" />
                <span className="truncate">{checkInDate} - {checkOutDate}</span>
              </div>
            </div>
            <div className="rounded-xl border border-stone-200 p-2.5 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-stone-400 uppercase">Guests</span>
                <div className="mt-0.5 flex items-center gap-1 text-stone-900 dark:text-stone-100 font-medium">
                  <Users className="h-3 w-3 text-stone-400" />
                  <span className="tabular-nums">{guests} guests</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="h-6 w-6 rounded bg-stone-100 text-xs font-bold text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
                >
                  -
                </button>
                <button
                  onClick={() => setGuests(Math.min(stay.specs.guests, guests + 1))}
                  className="h-6 w-6 rounded bg-stone-100 text-xs font-bold text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Nights duration adjuster */}
          <div className="mt-3 flex items-center justify-between text-xs px-1">
            <span className="text-stone-500">Duration:</span>
            <div className="flex items-center gap-2">
              {[2, 4, 7].map((n) => (
                <button
                  key={n}
                  onClick={() => setNights(n)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    nights === n
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  {n} nights
                </button>
              ))}
            </div>
          </div>

          {/* Calculated Cost Breakdown */}
          <div className="mt-4 space-y-1.5 border-t border-stone-100 pt-3 text-xs dark:border-stone-800">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>${stay.pricePerNight} × {nights} nights</span>
              <span className="tabular-nums">${baseTotal}</span>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Cleaning & architectural prep</span>
              <span className="tabular-nums">${stay.cleaningFee}</span>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Aether sanctuary concierge fee</span>
              <span className="tabular-nums">${stay.serviceFee}</span>
            </div>
            <div className="flex justify-between border-t border-stone-100 pt-2 font-bold text-stone-900 dark:border-stone-800 dark:text-stone-100">
              <span>Total reservation</span>
              <span className="tabular-nums text-sm">${totalPrice} USD</span>
            </div>
          </div>

          {/* Reserve Button */}
          <button
            onClick={() => onProceedToBooking(stay, nights, guests, checkInDate, checkOutDate)}
            className="mt-4 w-full rounded-xl bg-stone-900 py-3.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors"
          >
            Reserve Stay · ${totalPrice} USD
          </button>
        </div>

        {/* Guest Reviews Section */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Guest Testimonials ({SAMPLE_REVIEWS.length})
            </h2>
          </div>

          <div className="mt-3 space-y-3">
            {SAMPLE_REVIEWS.map((review: Review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-stone-200/60 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {review.author}
                      </span>
                      <p className="text-[10px] text-stone-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-400">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-semibold tabular-nums ml-1 text-stone-800 dark:text-stone-200">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
