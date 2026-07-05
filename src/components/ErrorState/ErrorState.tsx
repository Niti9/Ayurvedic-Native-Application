import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Props {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message = 'Something went wrong.', onRetry }: Props) => (
  <View style={styles.container}>
    <Text>{message}</Text>

    {onRetry && <Button title="Retry" onPress={onRetry} />}
  </View>
);

export default React.memo(ErrorState);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
