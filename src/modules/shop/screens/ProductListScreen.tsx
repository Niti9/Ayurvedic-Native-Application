import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProductListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop Module</Text>
      <Text style={styles.subtitle}>Product Listing</Text>
    </View>
  );
};

export default ProductListScreen;

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
