import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { doctorRepository } from '../repository/doctorRepository';
import { DoctorFilters } from '../types/filter';

const CACHE_CONFIG = {
  retry: 2, // Gracefully handle random failures
  staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes as cache
  gcTime: 1000 * 60 * 30, //Keep them in memory or Retain in background cache for 30 minutes
};

export const useDoctors = (search: string, filters: DoctorFilters) => {
  return useInfiniteQuery({
    queryKey: ['doctors', search, filters],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      doctorRepository.getDoctors({
        page: pageParam,
        limit: 20,
        search,
        ...filters,
      }),

    getNextPageParam: lastPage => {
      if (lastPage.pagination_meta.has_next_page) {
        return lastPage.pagination_meta.current_page + 1;
      }

      return undefined;
    },
    ...CACHE_CONFIG,
  });
};

export const useDoctor = (doctorId: string) => {
  return useQuery({
    queryKey: ['doctor', doctorId],

    queryFn: () => doctorRepository.getDoctorById(doctorId),

    enabled: !!doctorId, //Avoids firing the query if the ID is undefined during navigation.

    ...CACHE_CONFIG,
  });
};
