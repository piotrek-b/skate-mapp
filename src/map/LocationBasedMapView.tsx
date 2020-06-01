import React from 'react';
import { useDispatch } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet } from 'react-native';

import mapStyle from './mapStyle.json';

import { currentLocationUnFollowRequested } from '../state/actions/currentLocationActions';
import { LatLngDeltaDefaults } from '../consts';

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 0,
  },
});

interface ILocationBasedMapViewProps {
  children: React.ReactNode;
  initialLatitude: number;
  initialLongitude: number;
  onPress: (e: any) => void;
  onMarkerPress: (e: any) => void;
  mapRef: any;
}

export default ({
  children,
  initialLatitude,
  initialLongitude,
  onPress,
  onMarkerPress,
  mapRef,
}: ILocationBasedMapViewProps) => {
  const dispatch = useDispatch();

  return initialLatitude && initialLongitude ? (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle.style}
      style={styles.mapStyle}
      initialRegion={{
        latitude: initialLatitude,
        longitude: initialLongitude,
        latitudeDelta: LatLngDeltaDefaults.LATITUDE_DELTA,
        longitudeDelta: LatLngDeltaDefaults.LONGITUDE_DELTA,
      }}
      onPress={onPress}
      onMarkerPress={onMarkerPress}
      onTouchStart={() => {
        dispatch(currentLocationUnFollowRequested());
      }}
    >
      {children}
    </MapView>
  ) : null;
};
