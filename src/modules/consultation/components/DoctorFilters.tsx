// import React from 'react';
// import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';

// const FILTERS = ['All', 'Available', 'Hindi', 'Malayalam', 'Dermatology'];

// const DoctorFilters = () => {
//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.container}
//     >
//       {FILTERS.map(filter => (
//         <TouchableOpacity key={filter} style={styles.chip}>
//           <Text>{filter}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// export default React.memo(DoctorFilters);

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     paddingBottom: 10,
//   },
//   chip: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     backgroundColor: '#F3F4F6',
//     borderRadius: 20,
//     marginRight: 10,
//   },
// });

import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';

// 1. Maintain a clean, immutable token list for filtering criteria
export const DOCTOR_FILTERS = [
  'All',
  'Available',
  'Hindi',
  'English',
  'Malayalam',
  'Dermatology',
] as const;

export type DoctorFilterType = (typeof DOCTOR_FILTERS)[number];

interface Props {
  activeFilter: DoctorFilterType;
  //  Pass a stable callback to eliminate inline functional reference creation loops
  onSelectFilter: (filter: DoctorFilterType) => void;
}

const FilterChip = React.memo(
  ({
    filter,
    isActive,
    onPress,
  }: {
    filter: DoctorFilterType;
    isActive: boolean;
    onPress: (filter: DoctorFilterType) => void;
  }) => {
    const handlePress = () => onPress(filter);

    return (
      <TouchableOpacity
        style={[styles.chip, isActive && styles.activeChip]}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <Text style={[styles.text, isActive && styles.activeText]}>
          {filter}
        </Text>
      </TouchableOpacity>
    );
  },
);

const DoctorFilters = ({ activeFilter, onSelectFilter }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={true} // Performance boost: frees memory for off-screen chips
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {DOCTOR_FILTERS.map(filter => (
        <FilterChip
          key={filter}
          filter={filter}
          isActive={activeFilter === filter}
          onPress={onSelectFilter}
        />
      ))}
    </ScrollView>
  );
};

//  Strict structural checking to guarantee zero frame drops during scrolling passes
export default React.memo(DoctorFilters, (prev, next) => {
  return prev.activeFilter === next.activeFilter;
});

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0, // Prevents ScrollView from stealing height matching layout boundaries
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeChip: {
    backgroundColor: '#E6F4EA',
    borderColor: '#34A853',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  activeText: {
    color: '#137333',
    fontWeight: '600',
  },
});
