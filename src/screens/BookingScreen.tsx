import React, { useState } from 'react';
import { ArrowLeft, CreditCard, ShieldCheck, Calendar, Users, MapPin, Check, Lock } from 'lucide-react';
import { Stay, BookingDetails } from '../types/index.ts';

interface BookingScreenProps {
  stay: Stay;
  nights: number;
  guests: number;
  checkIn: string;
  checkOut: string;
  onBack: () => void;
  onConfirmBooking: (booking: BookingDetails) => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  stay,
  nights,
  guests,
  checkIn,
  checkOut,
  onBack,
  onConfirmBooking,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'google'>('card');
  const [guestName, setGuestName] = useState('Elena Rostova');
  const [guestEmail, setGuestEmail] = useState('elena.rostova@designworks.io');
  const [specialRequest, setSpecialRequest] = useState('Would appreciate late arrival keyless code and extra firewood for the cast iron stove.');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);

  const baseTotal = stay.pricePerNight * nights;
  const totalPrice = baseTotal + stay.cleaningFee + stay.serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const confirmationCode = `AET-${Math.floor(1000 + Math.random() * 9000)}-${stay.country.slice(0, 2).toUpperCase()}`;
      const accessCode = `${Math.floor(1000 + Math.random() * 9000)}#`;

      const newBooking: BookingDetails = {
        stayId: stay.id,
        stay,
        checkIn,
        checkOut,
        nights,
        guests,
        totalPrice,
        confirmationCode,
        bookedAt: 'Today',
        accessCode,
        status: 'confirmed',
      };

      setIsProcessing(false);
      onConfirmBooking(newBooking);
    }, 1000);
  };

  return (
    <div className="pb-20 text-stone-900 dark:text-stone-100">
      {/* Top Header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-stone-200/80 bg-stone-50/90 px-4 py-3.5 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/90">
        <button
          onClick={onBack}
          aria-label="Back to details"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-700 shadow-xs hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display">
            Request to Book & Reserve
          </h1>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Guaranteed reservation protected by Aether
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-5">
        {/* Stay Summary Card */}
        <div className="flex gap-3.5 rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <img
            src={stay.heroImage}
            alt={stay.title}
            referrerPolicy="no-referrer"
            className="h-20 w-24 rounded-xl object-cover"
          />
          <div className="flex-1">
            <span className="text-[10px] font-semibold text-stone-400 uppercase">
              {stay.category}
            </span>
            <h2 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
              {stay.title}
            </h2>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" />
              {stay.location}, {stay.country}
            </p>
            <div className="mt-2 text-xs font-semibold tabular-nums text-stone-900 dark:text-stone-100">
              ${stay.pricePerNight} <span className="font-normal text-stone-400 text-[10px]">/ night</span>
            </div>
          </div>
        </div>

        {/* Trip Parameters */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
            Your Stay Details
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-stone-50 p-2.5 dark:bg-stone-800/50">
              <span className="text-[10px] text-stone-400 font-medium">Dates ({nights} nights)</span>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Calendar className="h-3.5 w-3.5 text-stone-400" />
                <span>{checkIn} - {checkOut}</span>
              </div>
            </div>
            <div className="rounded-xl bg-stone-50 p-2.5 dark:bg-stone-800/50">
              <span className="text-[10px] text-stone-400 font-medium">Guests</span>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Users className="h-3.5 w-3.5 text-stone-400" />
                <span className="tabular-nums">{guests} adults</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Details Form */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Traveler Information
          </h2>
          <div>
            <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">
              Primary Guest Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-xs text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 focus:outline-hidden focus:border-stone-900"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">
              Confirmation Email
            </label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-xs text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 focus:outline-hidden focus:border-stone-900"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">
              Special Host Note & Arrival Time
            </label>
            <textarea
              rows={2}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 focus:outline-hidden focus:border-stone-900"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
            Payment Method
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'card', label: 'Credit Card', icon: CreditCard },
              { id: 'apple', label: 'Apple Pay', icon: ShieldCheck },
              { id: 'google', label: 'Google Pay', icon: Lock },
            ].map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-stone-900 bg-stone-50 text-stone-900 dark:border-stone-400 dark:bg-stone-800 dark:text-stone-100 shadow-xs'
                      : 'border-stone-200 text-stone-500 hover:bg-stone-50 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4 mb-1" />
                  <span className="text-[11px] whitespace-nowrap">{method.label}</span>
                </button>
              );
            })}
          </div>

          {paymentMethod === 'card' && (
            <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50/70 p-3 dark:border-stone-800 dark:bg-stone-800/40 text-xs space-y-2">
              <div className="flex justify-between items-center text-stone-600 dark:text-stone-300">
                <span>Card Number</span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                  {cardNumber}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500">
                <span>Expires 08/28</span>
                <span>CVV •••</span>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Summary */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 text-xs space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Pricing Breakdown
          </h2>
          <div className="flex justify-between text-stone-600 dark:text-stone-400">
            <span>${stay.pricePerNight} × {nights} nights</span>
            <span className="tabular-nums">${baseTotal}</span>
          </div>
          <div className="flex justify-between text-stone-600 dark:text-stone-400">
            <span>Architectural prep & cleaning</span>
            <span className="tabular-nums">${stay.cleaningFee}</span>
          </div>
          <div className="flex justify-between text-stone-600 dark:text-stone-400">
            <span>Aether service & concierge</span>
            <span className="tabular-nums">${stay.serviceFee}</span>
          </div>
          <div className="border-t border-stone-100 pt-2 flex justify-between font-bold text-stone-900 dark:border-stone-800 dark:text-stone-100 text-sm">
            <span>Total due today</span>
            <span className="tabular-nums">${totalPrice} USD</span>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="flex items-center gap-2.5 rounded-xl bg-stone-100/80 p-3 text-xs text-stone-600 dark:bg-stone-900/60 dark:text-stone-400">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>
            Complimentary 48-hour full refund cancellation policy on all architectural sanctuaries.
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full rounded-xl bg-stone-900 py-3.5 text-xs font-semibold text-white shadow-md hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Securing Reservation with Host...</span>
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5" />
              <span>Confirm & Pay · ${totalPrice} USD</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
