import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import ConsultationStack from './ConsultationStack';
import ShopStack from './ShopStack';
// import ProfileScreen from '@/modules/profile/screens/ProfileScreen';
import RecordsStack from './RecordsStack';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Consultation" component={ConsultationStack} />

      <Tab.Screen name="Shop" component={ShopStack} />

      <Tab.Screen name="Records" component={RecordsStack} />

      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabs;
