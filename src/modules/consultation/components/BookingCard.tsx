import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Booking } from '../types/booking';
import { useBooking } from '../hooks/useBooking';

interface Props {
  booking: Booking;
}

const BookingCard = ({ booking }: Props) => {
  const { cancelBooking } = useBooking();

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{booking.doctor.name}</Text>

      <Text>{booking.doctor.title}</Text>

      <Text>{booking.slot.start_time}</Text>

      <Button title="Cancel" onPress={() => cancelBooking(booking.id)} />
    </View>
  );
};

export default React.memo(BookingCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },

  name: {
    fontWeight: '700',
    fontSize: 18,
  },
});
