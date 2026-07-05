import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useBooking } from '../hooks/useBooking';
import BookingCard from '../components/BookingCard';

const UpcomingBookingScreen = () => {
  const { bookings } = useBooking();
  console.log('bookings are ', bookings);

  const upcomingBookings = bookings.filter(
    booking =>
      booking.status === 'BOOKED' &&
      new Date(booking.slot.start_time) > new Date(),
  );

  const renderItem = useCallback(
    ({ item }: any) => <BookingCard booking={item} />,
    [],
  );

  if (upcomingBookings.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No upcoming consultations.</Text>
      </View>
    );
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
