import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const Screen = ({ children }: PropsWithChildren) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
