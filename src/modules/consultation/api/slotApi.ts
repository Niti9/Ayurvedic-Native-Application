import apiClient from '@/ services/api/apiClient';
import { Slot } from '../types/slot';

export const getSlots = async (doctorId: string): Promise<Slot[]> => {
  const response = await apiClient.get<{
    data: Slot[];
  }>('/slots', {
    params: {
      doctor_id: doctorId,
    },
  });

  return response.data.data;
};
