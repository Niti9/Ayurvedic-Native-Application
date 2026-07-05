import { PaginationMeta } from '../../../types/api';

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

export interface DoctorListResponse {
  data: Doctor[];
  pagination_meta: PaginationMeta;
}
