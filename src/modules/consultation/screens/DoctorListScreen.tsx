import React, { useCallback, useMemo, useState } from 'react';

import Screen from '@/components/layout/Screen';
import DoctorFilters, { DoctorFilterType } from '../components/DoctorFilters';
import DoctorList from '../components/DoctorList';
import SearchBar from '@/components/SearchBar/SearchBar';
import { mapFilterToQuery } from '../utils/filterMapper';

const DoctorListScreen = () => {
  const [search, setSearch] = useState('');

  const [activeFilter, setActiveFilter] = useState<DoctorFilterType>('All');

  // Stabilize selection mutation passes completely
  const handleSelectFilter = useCallback((filter: DoctorFilterType) => {
    setActiveFilter(filter);
  }, []);
  const filters = useMemo(() => mapFilterToQuery(activeFilter), [activeFilter]);

  return (
    <Screen>
      <SearchBar value={search} onChangeText={setSearch} />

      <DoctorFilters
        activeFilter={activeFilter}
        onSelectFilter={handleSelectFilter}
      />

      <DoctorList search={search} filters={filters} />
    </Screen>
  );
};

export default DoctorListScreen;
