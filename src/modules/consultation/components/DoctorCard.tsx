import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Doctor } from '../types/doctor';
import Rating from '@/components/Rating/Rating';

interface Props {
  doctor: Doctor;
  onPress?: (doctorId: string) => void;
}

const DoctorCard = ({ doctor, onPress }: Props) => {
  const handlePress = () => {
    onPress?.(doctor.id);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image source={{ uri: doctor.image_url }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{doctor.name}</Text>

        <Text>{doctor.title}</Text>

        <Text>{doctor.experience_years} Years Experience</Text>

        <Rating value={doctor.rating} />

        <Text>
          {doctor.currency === 'INR' ? '₹' : doctor.currency}{' '}
          {doctor.consultation_fee}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// export default React.memo(DoctorCard);

export default React.memo(
  // This avoids unnecessary rerenders when the parent updates.
  DoctorCard,

  (prev, next) =>
    prev.doctor.id === next.doctor.id &&
    prev.doctor.rating === next.doctor.rating &&
    prev.doctor.consultation_fee === next.doctor.consultation_fee,
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
});
