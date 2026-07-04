import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DoctorListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultation Module</Text>
      <Text style={styles.subtitle}>Doctor Listing</Text>
    </View>
  );
};

export default DoctorListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
});
