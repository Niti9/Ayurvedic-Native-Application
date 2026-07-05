import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Slot } from '../types/slot';

interface Props {
  slot: Slot;
  selected: boolean;
  onPress: (slot: Slot) => void;
}

const SlotCard = ({ slot, selected, onPress }: Props) => {
  const isDisabled = slot.status !== 'AVAILABLE';
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isDisabled && styles.disabledCard,
        selected && styles.selectedCard,
      ]}
      onPress={() => onPress(slot)}
      disabled={slot.status !== 'AVAILABLE'}
    >
      <Text>{new Date(slot.start_time).toLocaleTimeString()}</Text>

      <Text>{slot.status}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(SlotCard);

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#EEE',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#0A8F55',
  },
  disabledCard: {
    opacity: 0.5,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#2e7d32',
  },
});
