import { Doctor } from './doctor';
import { Slot } from './slot';

export type BookingStatus =
  | 'BOOKED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'PENDING_SYNC';

export interface Booking {
  id: string;

  doctor: Doctor;

  slot: Slot;

  bookedAt: string;

  status: BookingStatus;

  isOffline: boolean;
}
