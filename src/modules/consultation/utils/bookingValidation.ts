import { Booking, BookingResult } from '../types/booking';
import { Slot } from '../types/slot';
import { isExpiredDate } from './date';

export const validateBooking = (
  slot: Slot,
  bookings: Booking[],
): BookingResult => {
  if (isExpiredDate(slot.start_time)) {
    return {
      success: false,
      message: 'This slot has expired.',
    };
  }

  switch (slot.status) {
    case 'BOOKED':
      return {
        success: false,
        message: 'This slot has already been booked.',
      };

    case 'LOCKED_FOR_CHECKOUT':
      return {
        success: false,
        message: 'Another user is booking this slot.',
      };

    case 'EXPIRED':
      return {
        success: false,
        message: 'This slot has expired.',
      };

    default:
      break;
  }

  const alreadyBooked = bookings.some(
    booking => booking.slot.id === slot.id && booking.status === 'BOOKED',
  );

  if (alreadyBooked) {
    return {
      success: false,
      message: 'You have already booked this slot.',
    };
  }

  return {
    success: true,
    message: '',
  };
};
