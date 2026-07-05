import apiClient from '@/ services/api/apiClient';
import { DoctorListResponse } from '../types/doctor';
import { DoctorFilters } from '../types/filter';

export interface DoctorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getDoctors = async (
  params: DoctorQueryParams,
): Promise<DoctorListResponse> => {
  const response = await apiClient.get<DoctorListResponse>('/doctors', {
    params,
  });

  return response.data;
};

export const getDoctorById = async (doctorId: string) => {
  const response = await apiClient.get<DoctorListResponse>('/doctors', {
    params: {
      page: 1,
      limit: 10000,
    },
  });

  const doctor = response.data.data.find(doctor => doctor.id === doctorId);

  if (!doctor) {
    throw new Error('Doctor not found');
  }

  return doctor;
};

export interface DoctorQueryParams extends DoctorFilters {
  page?: number;
  limit?: number;
  search?: string;
}
