import { getSlots } from '../api/slotApi';

export const slotRepository = {
  getSlots(doctorId: string) {
    return getSlots(doctorId);
  },
};
