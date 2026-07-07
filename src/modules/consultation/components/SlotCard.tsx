import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Slot } from '../types/slot';
import { formatTime } from '../utils/date';
import StatusBadge from '@/components/Badge/StatusBadge';

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
        slot.status === 'BOOKED' && styles.bookedCard,
        slot.status === 'LOCKED_FOR_CHECKOUT' && styles.lockedCard,
        slot.status === 'EXPIRED' && styles.expiredCard,
        selected && slot.status === 'AVAILABLE' && styles.selectedCard,
      ]}
      onPress={() => onPress(slot)}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      <Text>
        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
      </Text>

      <StatusBadge label={slot.status} />
    </TouchableOpacity>
  );
};

export default React.memo(SlotCard);

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  selectedCard: {
    borderColor: '#2E7D32',
    borderWidth: 2,
  },
  bookedCard: {
    backgroundColor: '#FFF5F5',
  },
  lockedCard: {
    backgroundColor: '#FFFBEB',
  },
  expiredCard: {
    backgroundColor: '#F3F4F6',
  },
  time: {
    fontWeight: '600',
    fontSize: 15,
  },
});
