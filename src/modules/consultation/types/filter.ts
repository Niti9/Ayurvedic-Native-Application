export interface DoctorFilters {
  specialty?: string;
  language?: string;
  availableToday?: boolean;
  sort?: 'rating' | 'experience' | 'fee_low' | 'fee_high';
}
