import apiClient from '@/ services/api/apiClient';
import { DoctorListResponse } from '../types/doctor';
import { DoctorFilters } from '../types/filter';

export interface DoctorQueryParams extends DoctorFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export const getDoctors = async (
  params: DoctorQueryParams,
): Promise<DoctorListResponse> => {
  const response = await apiClient.get('/doctors', {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search,
      specialty: params.specialty,
      language: params.language,
      available_today: params.availableToday,
      sort: params.sort,
    },
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
