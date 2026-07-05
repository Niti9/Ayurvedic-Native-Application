import { create } from 'zustand';

import { Booking, BookingResult } from '../types/booking';
import { Doctor } from '../types/doctor';
import { Slot } from '../types/slot';

interface BookingState {
  bookings: Booking[];

  bookAppointment: (doctor: Doctor, slot: Slot) => BookingResult;

  cancelBooking: (bookingId: string) => void;

  clearBookings: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],

  bookAppointment: (doctor, slot) => {
    const bookings = get().bookings;

    // 1. Expired slot
    if (new Date(slot.start_time).getTime() < Date.now()) {
      return {
        success: false,
        message: 'This Slot has expired.',
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

    // 3. Double booking prevention
    const alreadyBooked = bookings.some(
      booking => booking.slot.id === slot.id && booking.status === 'BOOKED',
    );

    if (alreadyBooked) {
      return {
        success: false,
        message: 'Slot already booked.',
      };
    }

    // 4. Save booking
    const booking: Booking = {
      id: `booking_${Date.now()}`,
      doctor,
      slot,
      bookedAt: new Date().toISOString(),
      status: 'BOOKED',
      isOffline: false,
    };

    set(state => ({
      bookings: [...state.bookings, booking],
    }));

    return {
      success: true,
      message: 'Appointment booked successfully.',
    };
  },

  cancelBooking: bookingId => {
    set(state => ({
      bookings: state.bookings.map(item =>
        item.id === bookingId
          ? {
              ...item,
              status: 'CANCELLED',
            }
          : item,
      ),
    }));
  },

  clearBookings: () => {
    set({
      bookings: [],
    });
  },
}));
