import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  message: string;
}

const BookingSuccessBanner = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default React.memo(BookingSuccessBanner);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCFCE7',
    margin: 16,
    padding: 12,
    borderRadius: 10,
  },

  text: {
    color: '#166534',
    fontWeight: '600',
  },
});
