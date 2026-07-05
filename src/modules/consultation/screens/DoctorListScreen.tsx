import React, { useCallback, useState } from 'react';

import Screen from '@/components/layout/Screen';
import DoctorFilters, { DoctorFilterType } from '../components/DoctorFilters';
import DoctorList from '../components/DoctorList';
import SearchBar from '@/components/SearchBar/SearchBar';

const DoctorListScreen = () => {
  const [search, setSearch] = useState('');

  const [activeFilter, setActiveFilter] = useState<DoctorFilterType>('All');

  // Stabilize selection mutation passes completely
  const handleSelectFilter = useCallback((filter: DoctorFilterType) => {
    setActiveFilter(filter);
  }, []);

  return (
    <Screen>
      <SearchBar value={search} onChangeText={setSearch} />

      <DoctorFilters
        activeFilter={activeFilter}
        onSelectFilter={handleSelectFilter}
      />

      <DoctorList search={search} />
    </Screen>
  );
};

export default DoctorListScreen;
