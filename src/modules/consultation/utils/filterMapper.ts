import { DoctorFilterType } from '../components/DoctorFilters';
import { DoctorFilters } from '../types/filter';

export const mapFilterToQuery = (filter: DoctorFilterType): DoctorFilters => {
  switch (filter) {
    case 'Available':
      return {
        availableToday: true,
      };

    case 'Hindi':
      return {
        language: 'Hindi',
      };

    case 'English':
      return {
        language: 'English',
      };

    case 'Malayalam':
      return {
        language: 'Malayalam',
      };

    case 'Dermatology':
      return {
        specialty: 'Dermatology',
      };

    default:
      return {};
  }
};
