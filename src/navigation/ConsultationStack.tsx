import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConsultationStackParamList } from './types';
import DoctorListScreen from '@/modules/consultation/screens/DoctorListScreen';
import DoctorDetailScreen from '@/modules/consultation/screens/DoctorDetailScreen';
import UpcomingBookingScreen from '@/modules/consultation/screens/UpcomingBookingScreen';

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
      <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
      <Stack.Screen name="UpcomingBooking" component={UpcomingBookingScreen} />
    </Stack.Navigator>
  );
};

export default ConsultationStack;
