import { create } from 'zustand';

import { Booking, BookingResult } from '../types/booking';
import { Doctor } from '../types/doctor';
import { Slot } from '../types/slot';
import { validateBooking } from '../utils/bookingValidation';
import { StorageService } from '@/ services/storage/storageService';

const BOOKING_STORAGE_KEY = 'consultation_bookings';

interface BookingState {
  bookings: Booking[];

  bookAppointment: (doctor: Doctor, slot: Slot) => BookingResult;

  cancelBooking: (bookingId: string) => void;

  clearBookings: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: StorageService.get(BOOKING_STORAGE_KEY) ?? [],

  // bookAppointment: (doctor, slot) => {
  //   const bookings = get().bookings;

  //   // 1. Expired slot
  //   if (new Date(slot.start_time).getTime() < Date.now()) {
  //     return {
  //       success: false,
  //       message: 'This Slot has expired.',
  //     };
  //   }

  //   switch (slot.status) {
  //     case 'BOOKED':
  //       return {
  //         success: false,
  //         message: 'This slot has already been booked.',
  //       };

  //     case 'LOCKED_FOR_CHECKOUT':
  //       return {
  //         success: false,
  //         message: 'Another user is booking this slot.',
  //       };

  //     case 'EXPIRED':
  //       return {
  //         success: false,
  //         message: 'This slot has expired.',
  //       };

  //     default:
  //       break;
  //   }

  //   // 3. Double booking prevention
  //   const alreadyBooked = bookings.some(
  //     booking => booking.slot.id === slot.id && booking.status === 'BOOKED',
  //   );

  //   if (alreadyBooked) {
  //     return {
  //       success: false,
  //       message: 'Slot already booked.',
  //     };
  //   }

  //   // 4. Save booking
  //   const booking: Booking = {
  //     id: `booking_${Date.now()}`,
  //     doctor,
  //     slot,
  //     bookedAt: new Date().toISOString(),
  //     status: 'BOOKED',
  //     isOffline: false,
  //   };

  //   set(state => ({
  //     bookings: [...state.bookings, booking],
  //   }));

  //   return {
  //     success: true,
  //     message: 'Appointment booked successfully.',
  //   };
  // },

  bookAppointment: (doctor, slot) => {
    const bookings = get().bookings;

    // 1. Run the isolated business rule engine pass
    const validation = validateBooking(slot, bookings);

    // 2. Short-circuit execution if a validation blocker is hit
    if (!validation.success) {
      return validation;
    }

    // 3. Success Path: Build out the structured booking object payload
    const newBooking: Booking = {
      id: `booking_${Date.now()}`,
      doctor,
      slot: {
        ...slot,
        status: 'BOOKED', // Transition status state safely
      },
      bookedAt: new Date().toISOString(),
      status: 'BOOKED',
      isOffline: false,
    };

    // 4. Mutate local store array tracking allocations synchronously
    // set(state => ({
    //   bookings: [...state.bookings, newBooking],
    // }));
    set(state => {
      const updated = [...state.bookings, newBooking];

      try {
        StorageService.set(BOOKING_STORAGE_KEY, updated);
      } catch (storageError) {
        console.error('CRITICAL PERSISTENCE FAULT:', storageError);
      }

      return {
        bookings: updated,
      };
    });

    // 5. Explicitly return a valid BookingResult signature matching the type rule
    return {
      success: true,
      message: 'Appointment booked successfully.',
    };
  },

  // cancelBooking: bookingId => {
  //   set(state => ({
  //     bookings: state.bookings.map(item =>
  //       item.id === bookingId
  //         ? {
  //             ...item,
  //             status: 'CANCELLED',
  //           }
  //         : item,
  //     ),
  //   }));
  // },

  // Inside your useBookingStore slice engine

  cancelBooking: bookingId => {
    set(state => {
      //  Generate the immutably mapped update copy
      const updatedBookings = state.bookings.map(item =>
        item.id === bookingId
          ? {
              ...item,
              status: 'CANCELLED' as const, // Cast to your typed literal status union
            }
          : item,
      );

      //  Synchronously write the dataset snapshot down to disk (MMKV)
      try {
        StorageService.set(BOOKING_STORAGE_KEY, updatedBookings);
      } catch (storageError) {
        //  Log failures silently without crashing the layout thread
        console.error('CRITICAL PERSISTENCE FAULT:', storageError);
      }

      return {
        bookings: updatedBookings,
      };
    });
  },

  clearBookings: () => {
    StorageService.remove(BOOKING_STORAGE_KEY);

    set({
      bookings: [],
    });
  },
}));
