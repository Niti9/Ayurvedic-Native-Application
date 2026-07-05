import { DoctorQueryParams, getDoctorById, getDoctors } from '../api/doctorApi';

export const doctorRepository = {
  getDoctors(params: DoctorQueryParams) {
    return getDoctors(params);
  },

  getDoctorById(id: string) {
    return getDoctorById(id);
  },
};
