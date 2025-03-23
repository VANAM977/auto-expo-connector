
// Define our own application-specific types to use with Supabase
// These types are separate from the auto-generated Supabase types

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'organizer' | 'guide' | 'visitor';
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  image_url?: string;
  organizer_id: string;
  guide_id?: string;
  guide_name?: string;
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  latitude?: number;
  longitude?: number;
  featured?: boolean;
}

export interface Guide {
  id: string;
  name: string;
  bio: string;
  avatar_url?: string;
  specialty: string;
  languages: string[];
  rating: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  event_id: string;
  user_id: string;
  booking_date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface TravelBooking {
  id: string;
  user_id: string;
  booking_id?: string;
  travel_type: 'flight' | 'train' | 'bus';
  departure_location: string;
  arrival_location: string;
  departure_time: string;
  arrival_time: string;
  booking_reference?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface AccommodationBooking {
  id: string;
  user_id: string;
  booking_id?: string;
  hotel_name: string;
  check_in_date: string;
  check_out_date: string;
  booking_reference?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface ChargingStation {
  id: string;
  name: string;
  location: string;
  station_type: 'ev' | 'petrol' | 'diesel' | 'hybrid';
  available_slots: number;
  price_per_unit: number;
  created_at: string;
  updated_at: string;
  latitude?: number;
  longitude?: number;
}

export interface ChargingBooking {
  id: string;
  user_id: string;
  station_id: string;
  booking_date: string;
  duration_minutes: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
  updated_at: string;
}
