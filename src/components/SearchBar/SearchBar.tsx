import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}: Props) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="search"
    />
  );
};

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  input: {
    height: 48,
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
});
