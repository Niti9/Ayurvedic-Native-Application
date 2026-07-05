import { useQuery } from '@tanstack/react-query';

import { slotRepository } from '../repository/slotRepository';

export const useSlots = (doctorId: string) => {
  return useQuery({
    queryKey: ['slots', doctorId],

    queryFn: () => slotRepository.getSlots(doctorId),

    enabled: !!doctorId,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 2,
  });
};
