import { useBookingStore } from '../store/bookingStore';

export const useBooking = () => {
  const bookings = useBookingStore(state => state.bookings);

  const addBooking = useBookingStore(state => state.addBooking);

  const cancelBooking = useBookingStore(state => state.cancelBooking);

  return {
    bookings,
    addBooking,
    cancelBooking,
  };
};
