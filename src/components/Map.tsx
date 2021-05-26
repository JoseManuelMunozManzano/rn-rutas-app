import React from 'react';
import MapView, {Marker} from 'react-native-maps';

import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';

interface Props {
  markers?: Marker[];
}

export const Map = ({markers}: Props) => {
  const {hasLocation, initialPosition} = useLocation();

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        style={{flex: 1}}
        // con esta línea y la configuración se puede hacer que se use en IOS GoogleMaps
        // Sin esta línea, en Android se usará GoogleMaps y en IOS se usará AppleMaps
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Esto es un título"
          description="Esto es una descripción del marcador"
        /> */}
      </MapView>
    </>
  );
};
