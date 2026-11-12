import React from 'react';
import { CheckCircle2, Calendar, MapPin, Key, X, Download } from 'lucide-react';
import { BookingDetails } from '../types/index.ts';

interface BookingConfirmationModalProps {
  booking: BookingDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onViewTrips: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  isOpen,
  onClose,
  onViewTrips,
}) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-900">
        {/* Top Header Card */}
        <div className="bg-stone-900 p-6 text-white dark:bg-stone-950 text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400">
            RESERVATION CONFIRMED
          </span>
          <h2 className="mt-1 text-xl font-bold font-display">{booking.stay.title}</h2>
          <p className="text-xs text-stone-400 flex items-center justify-center gap-1 mt-1">
            <MapPin className="h-3 w-3" />
            {booking.stay.location}, {booking.stay.country}
          </p>
        </div>

        {/* Ticket Body */}
        <div className="p-6 space-y-4">
          {/* Reservation Code & QR Code */}
          <div className="flex items-center justify-between rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                CONFIRMATION REF
              </span>
              <p className="text-sm font-mono font-bold tracking-wider text-stone-900 dark:text-stone-100">
                {booking.confirmationCode}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                <Key className="h-3.5 w-3.5 text-amber-500" />
                <span>Smart Lock Pin: </span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                  {booking.accessCode}
                </span>
              </div>
            </div>

            {/* Simulated Vector QR Code */}
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-white p-1.5 shadow-xs ring-1 ring-stone-200 dark:ring-stone-700">
              <svg viewBox="0 0 24 24" className="h-full w-full text-stone-900 fill-current">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm0-4h4v-4h-4v4zm4-4h4v-4h-4v4z" />
              </svg>
            </div>
          </div>

          {/* Dates & Guests Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-3 dark:border-stone-800 dark:bg-stone-800/30">
              <span className="text-[10px] font-semibold text-stone-400 uppercase">Check-In</span>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Calendar className="h-3.5 w-3.5 text-stone-400" />
                <span>{booking.checkIn}</span>
              </div>
              <span className="text-[10px] text-stone-500">From 15:00</span>
            </div>
            <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-3 dark:border-stone-800 dark:bg-stone-800/30">
              <span className="text-[10px] font-semibold text-stone-400 uppercase">Check-Out</span>
              <div className="mt-1 flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                <Calendar className="h-3.5 w-3.5 text-stone-400" />
                <span>{booking.checkOut}</span>
              </div>
              <span className="text-[10px] text-stone-500">Until 11:00</span>
            </div>
          </div>

          {/* Total Paid */}
          <div className="flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800 text-xs">
            <span className="text-stone-500">Total Paid ({booking.nights} nights)</span>
            <span className="font-bold tabular-nums text-stone-900 dark:text-stone-100 text-sm">
              ${booking.totalPrice} USD
            </span>
          </div>

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                onClose();
                onViewTrips();
              }}
              className="w-full rounded-xl bg-stone-900 py-3 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-colors"
            >
              Open Itinerary & Check-In Guide
            </button>
            <button
              onClick={onClose}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-stone-200 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Download Stay Pass to Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
