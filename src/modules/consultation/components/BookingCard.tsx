import React, { useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Booking } from '../types/booking';
import { useBooking } from '../hooks/useBooking';
import { formatTime } from '../utils/date';

interface Props {
  booking: Booking;
}

const BookingCard = ({ booking }: Props) => {
  const { cancelBooking } = useBooking();

  const handleCancel = useCallback(() => {
    cancelBooking(booking.id);
  }, [booking.id, cancelBooking]);

  return (
    <View style={styles.card}>
      <Text>{booking.doctor.name}</Text>

      <Text>{booking.slot.start_time}</Text>
      <Text>
        {formatTime(booking.slot.start_time)} -{' '}
        {formatTime(booking.slot.end_time)}
      </Text>

      <Text>Status : {booking.status}</Text>

      {booking.status === 'BOOKED' && (
        <Button title="Cancel Booking" color="red" onPress={handleCancel} />
      )}
    </View>
  );
};

export default React.memo(BookingCard);

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
});
