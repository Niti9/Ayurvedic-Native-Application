import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useBooking } from '../hooks/useBooking';
import BookingCard from '../components/BookingCard';
import EmptyState from '@/components/EmptyState/EmptyState';
import { Booking } from '../types/booking';
import { isFutureDate } from '../utils/date';

const UpcomingBookingScreen = () => {
  const { bookings } = useBooking();
  console.log('bookings are ', bookings);

  const upcomingBookings = useMemo(() => {
    return bookings
      .filter(
        booking =>
          booking.status === 'BOOKED' && isFutureDate(booking.slot.start_time),
      )
      .sort(
        (a, b) =>
          new Date(a.slot.start_time).getTime() -
          new Date(b.slot.start_time).getTime(),
      );
  }, [bookings]);

  const renderItem = useCallback(
    ({ item }: { item: Booking }) => <BookingCard booking={item} />,
    [],
  );

  if (upcomingBookings.length === 0) {
    return <EmptyState title="No Upcoming consultations" />;
  }

  return (
    <FlatList
      data={upcomingBookings}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default UpcomingBookingScreen;
