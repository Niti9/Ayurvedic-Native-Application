import { Booking } from '../types/booking';
import { Slot } from '../types/slot';

export const isSlotExpired = (slot: Slot) => {
  return new Date(slot.start_time).getTime() < Date.now();
};

export const hasBookingConflict = (bookings: Booking[], slot: Slot) => {
  return bookings.some(
    booking => booking.status === 'BOOKED' && booking.slot.id === slot.id,
  );
};

export const canBookSlot = (bookings: Booking[], slot: Slot) => {
  if (slot.status !== 'AVAILABLE') {
    return false;
  }

  if (isSlotExpired(slot)) {
    return false;
  }

  if (hasBookingConflict(bookings, slot)) {
    return false;
  }

  return true;
};
