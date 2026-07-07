import { useMemo } from 'react';

import { useSlots } from './useSlots';
import { useBookingStore } from '../store/bookingStore';

export const useMergedSlots = (doctorId: string) => {
  const query = useSlots(doctorId);

  const bookings = useBookingStore(state => state.bookings);

  const bookedSlotIds = useMemo(() => {
    return new Set(
      bookings
        .filter(item => item.status === 'BOOKED')
        .map(item => item.slot.id),
    );
  }, [bookings]);

  const mergedSlots = useMemo(() => {
    if (!query.data) {
      return [];
    }

    return query.data.map(slot => {
      if (!bookedSlotIds.has(slot.id)) {
        return slot;
      }

      return {
        ...slot,
        status: 'BOOKED' as const,
      };
    });
  }, [query.data, bookedSlotIds]);

  return {
    ...query,
    data: mergedSlots,
  };
};
