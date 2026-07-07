import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useDoctors } from '../hooks/useDoctors';
import { FlashList } from '@shopify/flash-list';
import DoctorCard from '../components/DoctorCard';
import { useDebounce } from '@/hooks/useDebounce';
import { Doctor } from '../types/doctor';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { ConsultationStackParamList } from '@/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorFilters } from '../types/filter';

interface Props {
  search: string;
  filters: DoctorFilters;
}

type NavigationProp = NativeStackNavigationProp<
  ConsultationStackParamList,
  'DoctorList'
>;

const DoctorList = ({ search, filters }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const debouncedSearch = useDebounce(search);
  const handleDoctorPress = useCallback(
    (doctorId: string) => {
      navigation.navigate('DoctorDetail', {
        doctorId,
      });
    },
    [navigation],
  );

  const {
    data,

    isLoading,

    error,

    fetchNextPage,

    hasNextPage,

    isFetchingNextPage,

    refetch,

    isRefetching,
  } = useDoctors(debouncedSearch, filters);

  // Optimization 1: Memoize flatMap so it only computes when data coordinates change
  const doctors = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.data);
  }, [data?.pages]);

  // Optimization 2: Stabilize item renderer with useCallback reference
  const renderDoctorItem = useCallback(
    ({ item }: { item: Doctor }) => {
      return <DoctorCard doctor={item} onPress={handleDoctorPress} />;
    },
    [handleDoctorPress],
  );

  // Optimization 3: Stabilize footer node to avoid layout calculation thrashing
  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator size="small" />;
  }, [isFetchingNextPage]);

  // Optimization 4: Handle infinite scroll execution loop safely
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Something went wrong.</Text>
      </View>
    );
  }

  if (doctors.length === 0) {
    return <EmptyState title="No doctors found." />;
  }

  return (
    <FlashList
      data={doctors}
      estimatedItemSize={140}
      keyExtractor={item => item.id}
      renderItem={renderDoctorItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefetching}
      // onRefresh={refetch}
      onRefresh={() => {
        refetch(); // Direct refetch bypasses staleTime
      }}
      ListFooterComponent={renderFooter}
    />
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },

  name: {
    fontWeight: '700',
    fontSize: 18,
  },
});
