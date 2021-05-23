import React, {useEffect} from 'react';
import {createContext, useState} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  // Para saber en cualquier momento el estado de los permisos
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (state: any) => {
    if (state !== 'active') {
      return;
    }

    checkLocationPermission();
  };

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    // Abrir Settings (ajustes de la app)
    if (permissionStatus === 'blocked') {
      openSettings();
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermission, checkLocationPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
