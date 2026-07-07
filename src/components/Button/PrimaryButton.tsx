import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const PrimaryButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
}: Props) => {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      disabled={disabled || loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};

export default React.memo(PrimaryButton);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    margin: 16,
    alignItems: 'center',
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
