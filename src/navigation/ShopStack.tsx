import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ShopStackParamList } from './types';
import ProductListScreen from '@/modules/shop/screens/ProductListScreen';

const Stack = createNativeStackNavigator<ShopStackParamList>();

const ShopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductList" component={ProductListScreen} />
    </Stack.Navigator>
  );
};

export default ShopStack;
