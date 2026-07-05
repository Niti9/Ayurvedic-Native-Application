import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
}

const EmptyState = ({ title }: Props) => (
  <View style={styles.container}>
    <Text>{title}</Text>
  </View>
);

export default React.memo(EmptyState);

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: 'center',
  },
});
