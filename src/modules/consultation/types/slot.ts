export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'LOCKED' | 'EXPIRED';

export interface Slot {
  id: string;
  doctor_id: string;
  start_time: string;
  end_time: string;
  status: SlotStatus;
  version: number;
  locked_until: string | null;
}

export interface SlotListResponse {
  data: Slot[];
}
