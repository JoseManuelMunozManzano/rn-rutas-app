import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {MapScreen} from '../pages/MapScreen';
import {PermissionsScreen} from '../pages/PermissionsScreen';

export type RootStackParams = {
  MapScreen: undefined;
  PermissionsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
