import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RecordsStackParamList } from './types';
import TimelineScreen from '@/modules/records/screens/TimeLineScreen';

const Stack = createNativeStackNavigator<RecordsStackParamList>();

const RecordsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Timeline"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Timeline" component={TimelineScreen} />
    </Stack.Navigator>
  );
};

export default RecordsStack;
