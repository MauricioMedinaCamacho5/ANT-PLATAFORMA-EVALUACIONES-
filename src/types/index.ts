export type ScreenId = 'explore' | 'detail' | 'booking' | 'trips' | 'wishlist' | 'profile';
export type ViewportMode = 'mobile' | 'overview' | 'desktop';

export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  responseRate: string;
  responseTime: string;
  joined: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Stay {
  id: string;
  title: string;
  tagline: string;
  location: string;
  region: string;
  country: string;
  category: 'Architectural' | 'Nordic' | 'Desert' | 'Coastal' | 'Forest' | 'Alpine';
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  heroImage: string;
  gallery: string[];
  host: Host;
  specs: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  amenities: Amenity[];
  description: string;
  architectNote?: string;
  isSaved?: boolean;
}

export interface BookingDetails {
  stayId: string;
  stay: Stay;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
  confirmationCode: string;
  bookedAt: string;
  accessCode: string;
  status: 'confirmed' | 'active' | 'completed';
}

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  title: string;
  location: string;
  category: 'adventure' | 'dining' | 'wellness' | 'culture';
  notes: string;
  completed?: boolean;
}
