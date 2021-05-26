import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Map} from '../components/Map';

export const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({});
