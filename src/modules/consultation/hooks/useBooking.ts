import { useBookingStore } from '../store/bookingStore';

export const useBooking = () => {
  const bookings = useBookingStore(state => state.bookings);

  const bookAppointment = useBookingStore(state => state.bookAppointment);

  const cancelBooking = useBookingStore(state => state.cancelBooking);

  const clearBookings = useBookingStore(state => state.clearBookings);

  return {
    bookings,
    bookAppointment,
    cancelBooking,
    clearBookings,
  };
};
