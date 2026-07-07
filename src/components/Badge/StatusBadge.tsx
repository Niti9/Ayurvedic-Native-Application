import { SlotStatus } from '@/modules/consultation/types/slot';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
interface Props {
  label: SlotStatus;
}

const StatusBadge = ({ label }: Props) => {
  const badgeStyle = getBadgeStyle(label);

  return (
    <View style={[styles.container, badgeStyle.container]}>
      <Text style={[styles.text, badgeStyle.text]}>
        {label.replaceAll('_', ' ')}
      </Text>
    </View>
  );
};

const getBadgeStyle = (status: SlotStatus) => {
  switch (status) {
    case 'AVAILABLE':
      return {
        container: styles.available,
        text: styles.availableText,
      };

    case 'BOOKED':
      return {
        container: styles.booked,
        text: styles.bookedText,
      };

    case 'LOCKED_FOR_CHECKOUT':
      return {
        container: styles.locked,
        text: styles.lockedText,
      };

    case 'EXPIRED':
      return {
        container: styles.expired,
        text: styles.expiredText,
      };

    default:
      return {
        container: styles.available,
        text: styles.availableText,
      };
  }
};

export default React.memo(StatusBadge);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    marginTop: 8,
  },

  text: {
    fontSize: 12,
    fontWeight: '600',
  },

  available: {
    backgroundColor: '#DCFCE7',
  },

  availableText: {
    color: '#166534',
  },

  booked: {
    backgroundColor: '#FEE2E2',
  },

  bookedText: {
    color: '#991B1B',
  },

  locked: {
    backgroundColor: '#FEF3C7',
  },

  lockedText: {
    color: '#92400E',
  },

  expired: {
    backgroundColor: '#E5E7EB',
  },

  expiredText: {
    color: '#374151',
  },
});
