import { create } from 'zustand';

import { Booking } from '../types/booking';

interface BookingState {
  bookings: Booking[];

  addBooking: (booking: Booking) => void;

  cancelBooking: (bookingId: string) => void;

  clearBookings: () => void;
}

export const useBookingStore = create<BookingState>(set => ({
  bookings: [],

  addBooking: booking =>
    set(state => ({
      bookings: [...state.bookings, booking],
    })),

  cancelBooking: bookingId =>
    set(state => ({
      bookings: state.bookings.map(booking =>
        booking.id === bookingId
          ? {
              ...booking,
              status: 'CANCELLED',
            }
          : booking,
      ),
    })),

  clearBookings: () =>
    set({
      bookings: [],
    }),
}));
