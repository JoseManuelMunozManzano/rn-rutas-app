import React, {useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {MapScreen} from '../pages/MapScreen';
import {PermissionsScreen} from '../pages/PermissionsScreen';
import {PermissionsContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Platform} from 'react-native';

export type RootStackParams = {
  MapScreen: undefined;
  PermissionsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  const {permissions} = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  console.log(
    Platform.OS + ' en Navigator.tsx con estado ' + permissions.locationStatus,
  );

  return (
    <Stack.Navigator
      // initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};
