import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Doctor } from '../types/doctor';
import { formatCurrency } from '../utils/currency';

interface Props {
  doctor: Doctor;
}

const DoctorProfile = ({ doctor }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: doctor.image_url,
        }}
        style={styles.image}
      />

      <Text style={styles.name}>{doctor.name}</Text>

      <Text style={styles.title}>{doctor.title}</Text>

      <Text>
        ⭐ {doctor.rating} ({doctor.review_count} Reviews)
      </Text>

      <Text>{doctor.experience_years} Years Experience</Text>

      <Text>{formatCurrency(doctor.consultation_fee, doctor.currency)}</Text>

      <Text>Languages: {doctor.languages_spoken.join(', ')}</Text>

      <Text>Qualifications: {doctor.qualifications.join(', ')}</Text>

      <Text>Specialties: {doctor.specialties.join(', ')}</Text>

      <Text>Clinic: {doctor.clinic_address}</Text>

      <Text style={styles.bio}>{doctor.bio}</Text>
    </View>
  );
};

export default React.memo(DoctorProfile);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },

  title: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 12,
  },

  bio: {
    marginTop: 12,
    lineHeight: 22,
  },
});
