import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header.tsx';
import { DeviceFrame } from './components/DeviceFrame.tsx';
import { BottomNavBar } from './components/BottomNavBar.tsx';
import { MultiScreenOverview } from './components/MultiScreenOverview.tsx';
import { FilterModal } from './components/FilterModal.tsx';
import { BookingConfirmationModal } from './components/BookingConfirmationModal.tsx';
import { ExploreScreen } from './screens/ExploreScreen.tsx';
import { DetailScreen } from './screens/DetailScreen.tsx';
import { BookingScreen } from './screens/BookingScreen.tsx';
import { TripsScreen } from './screens/TripsScreen.tsx';
import { WishlistScreen } from './screens/WishlistScreen.tsx';
import { ProfileScreen } from './screens/ProfileScreen.tsx';
import { Stay, BookingDetails, ScreenId, ViewportMode } from './types/index.ts';
import { INITIAL_STAYS, INITIAL_BOOKING } from './data/staysData.ts';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('explore');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile');
  const [isDark, setIsDark] = useState(false);
  const [stays, setStays] = useState<Stay[]>(INITIAL_STAYS);
  const [selectedStay, setSelectedStay] = useState<Stay>(INITIAL_STAYS[0]);
  const [booking, setBooking] = useState<BookingDetails | null>(INITIAL_BOOKING);
  const [confirmedModalBooking, setConfirmedModalBooking] = useState<BookingDetails | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Booking parameters passed from Detail to Booking
  const [bookingParams, setBookingParams] = useState({
    nights: 4,
    guests: 2,
    checkIn: 'Nov 18, 2026',
    checkOut: 'Nov 22, 2026',
  });

  // Dark mode class synchronization
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleSave = (stayId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStays((prev) =>
      prev.map((s) => (s.id === stayId ? { ...s, isSaved: !s.isSaved } : s))
    );
    if (selectedStay.id === stayId) {
      setSelectedStay((prev) => ({ ...prev, isSaved: !prev.isSaved }));
    }
  };

  const handleSelectStay = (stay: Stay) => {
    setSelectedStay(stay);
    setCurrentScreen('detail');
  };

  const handleProceedToBooking = (
    stay: Stay,
    nights: number,
    guests: number,
    checkIn: string,
    checkOut: string
  ) => {
    setSelectedStay(stay);
    setBookingParams({ nights, guests, checkIn, checkOut });
    setCurrentScreen('booking');
  };

  const handleConfirmBooking = (newBooking: BookingDetails) => {
    setBooking(newBooking);
    setConfirmedModalBooking(newBooking);
  };

  const handleToggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(1000);
    setSelectedAmenities([]);
    setSearchQuery('');
  };

  // Filtered stays computation
  const filteredStays = useMemo(() => {
    return stays.filter((stay) => {
      // Category filter
      if (selectedCategory !== 'All' && stay.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (stay.pricePerNight > maxPrice) {
        return false;
      }
      // Amenities filter
      if (selectedAmenities.length > 0) {
        const stayAmenityIds = stay.amenities.map((a) => a.id);
        const hasAllAmenities = selectedAmenities.every((id) => stayAmenityIds.includes(id));
        if (!hasAllAmenities) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = stay.title.toLowerCase().includes(q);
        const matchesLocation = stay.location.toLowerCase().includes(q);
        const matchesCountry = stay.country.toLowerCase().includes(q);
        const matchesTagline = stay.tagline.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocation && !matchesCountry && !matchesTagline) {
          return false;
        }
      }
      return true;
    });
  }, [stays, selectedCategory, maxPrice, selectedAmenities, searchQuery]);

  const savedCount = stays.filter((s) => s.isSaved).length;

  // Active Screen Renderer Helper
  const renderActiveScreenContent = () => {
    switch (currentScreen) {
      case 'explore':
        return (
          <ExploreScreen
            stays={filteredStays}
            onSelectStay={handleSelectStay}
            onToggleSave={handleToggleSave}
            onOpenFilters={() => setIsFilterModalOpen(true)}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
      case 'detail':
        return (
          <DetailScreen
            stay={selectedStay}
            onBack={() => setCurrentScreen('explore')}
            onToggleSave={handleToggleSave}
            onProceedToBooking={handleProceedToBooking}
          />
        );
      case 'booking':
        return (
          <BookingScreen
            stay={selectedStay}
            nights={bookingParams.nights}
            guests={bookingParams.guests}
            checkIn={bookingParams.checkIn}
            checkOut={bookingParams.checkOut}
            onBack={() => setCurrentScreen('detail')}
            onConfirmBooking={handleConfirmBooking}
          />
        );
      case 'trips':
        return (
          <TripsScreen
            booking={booking}
            onExploreMore={() => setCurrentScreen('explore')}
          />
        );
      case 'wishlist':
        return (
          <WishlistScreen
            stays={stays}
            onSelectStay={handleSelectStay}
            onToggleSave={handleToggleSave}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            isDark={isDark}
            onToggleTheme={toggleTheme}
            onNavigateToScreen={setCurrentScreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Top Header Navigation */}
      <Header
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        viewportMode={viewportMode}
        onViewportModeChange={setViewportMode}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        savedCount={savedCount}
      />

      {/* Main Viewport Container */}
      <main className="w-full">
        {viewportMode === 'overview' ? (
          /* Multi-Screen Side-by-Side Studio Layout */
          <MultiScreenOverview
            stays={filteredStays}
            selectedStay={selectedStay}
            onSelectStay={handleSelectStay}
            onToggleSave={handleToggleSave}
            onOpenFilters={() => setIsFilterModalOpen(true)}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onProceedToBooking={handleProceedToBooking}
            booking={booking}
            onConfirmBooking={handleConfirmBooking}
            onZoomScreen={(screen) => {
              setCurrentScreen(screen);
              setViewportMode('mobile');
            }}
            savedCount={savedCount}
          />
        ) : viewportMode === 'mobile' ? (
          /* Single Mobile Device Mockup Frame */
          <div className="py-6 px-4">
            <DeviceFrame screenTitle={`Aether Mobile · ${currentScreen.toUpperCase()} VIEW`}>
              <div className="flex flex-col min-h-full justify-between">
                <div className="flex-1">{renderActiveScreenContent()}</div>
                <BottomNavBar
                  currentScreen={currentScreen}
                  onScreenChange={setCurrentScreen}
                  savedCount={savedCount}
                  hasActiveTrip={!!booking}
                />
              </div>
            </DeviceFrame>
          </div>
        ) : (
          /* Full Desktop Responsive Layout */
          <div className="mx-auto max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 min-h-[700px]">
              {renderActiveScreenContent()}
            </div>
          </div>
        )}
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        selectedAmenities={selectedAmenities}
        onToggleAmenity={handleToggleAmenity}
        onReset={handleResetFilters}
      />

      {/* Booking Boarding Pass Confirmation Modal */}
      <BookingConfirmationModal
        booking={confirmedModalBooking}
        isOpen={!!confirmedModalBooking}
        onClose={() => setConfirmedModalBooking(null)}
        onViewTrips={() => setCurrentScreen('trips')}
      />
    </div>
  );
}
