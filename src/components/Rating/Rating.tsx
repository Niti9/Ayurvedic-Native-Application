import React from 'react';
import { Text } from 'react-native';

interface Props {
  value: number;
}

const Rating = ({ value }: Props) => {
  return <Text>⭐ {value}</Text>;
};

export default React.memo(Rating);
