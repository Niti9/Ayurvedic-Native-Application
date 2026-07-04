import React from 'react';
import RootNavigator from '@/navigation/RootNavigator';
import AppProviders from './providers/AppProviders';

const Root = () => {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};

export default Root;
