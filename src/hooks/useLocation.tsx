import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setInitialPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        setHasLocation(true);
      },
      err => console.log({err}),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, []);

  return {
    hasLocation,
    initialPosition,
  };
};
