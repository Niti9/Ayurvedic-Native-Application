import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConsultationStackParamList } from './types';
import DoctorListScreen from '@/modules/consultation/screens/DoctorListScreen';

const Stack = createNativeStackNavigator<ConsultationStackParamList>();

const ConsultationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DoctorList" component={DoctorListScreen} />
    </Stack.Navigator>
  );
};

export default ConsultationStack;
