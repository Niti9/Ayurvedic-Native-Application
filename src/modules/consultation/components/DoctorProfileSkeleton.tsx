import React from 'react';
import { DimensionValue, StyleSheet, View } from 'react-native';

const Block = ({
  width,
  height,
}: {
  width: DimensionValue;
  height: number;
}) => (
  <View
    style={[
      styles.block,
      {
        width,
        height,
      },
    ]}
  />
);

const DoctorProfileSkeleton = () => {
  return (
    <View style={styles.container}>
      <Block width={90} height={90} />
      <Block width="70%" height={24} />
      <Block width="50%" height={18} />
      <Block width="90%" height={18} />
      <Block width="40%" height={18} />
    </View>
  );
};

export default React.memo(DoctorProfileSkeleton);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },

  block: {
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
});
