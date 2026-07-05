export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  qualifications: string[];
  experience_years: number;
  rating: number;
  review_count: number;
  consultation_fee: number;
  currency: string;
  languages_spoken: string[];
  image_url: string;
  bio: string;
  clinic_address: string;
  is_available_today: boolean;
}

export interface Slot {
  id: string;
  doctor_id: string;
  start_time: string;
  end_time: string;
  status: 'AVAILABLE' | 'BOOKED' | 'LOCKED' | 'EXPIRED';
  version: number;
  locked_until: string | null;
}

export interface PaginationMeta {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next_page: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination_meta: PaginationMeta;
}
