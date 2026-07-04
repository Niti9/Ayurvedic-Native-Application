import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TimelineScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Records</Text>
      <Text style={styles.subtitle}>Timeline</Text>
    </View>
  );
};

export default TimelineScreen;

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
