import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Dimensions, StyleSheet } from 'react-native';

import UserPositionMarker from './UserPositionMarker';
import SpotsMarkers from './SpotsMarkers';
import mapStyle from './mapStyle.json';
import { spotSelected } from '../state/actions/selectedActions';

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 24,
    zIndex: -1,
  },
});

export default () => {
  const dispatch = useDispatch();
  const [initialLatitude, setInitialLatitude] = useState(0);
  const [initialLongitude, setInitialLongitude] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const callback = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setError('Permission to access location was denied');
      }

      const location = await Location.getCurrentPositionAsync({});
      setInitialLatitude(location.coords.latitude);
      setInitialLongitude(location.coords.longitude);
    };

    callback();
  }, []);

  return error ? null : (
    <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle.style}
      style={styles.mapStyle}
      region={{
        latitude: initialLatitude,
        longitude: initialLongitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      onPress={() => dispatch(spotSelected(null))}
      onMarkerPress={({ nativeEvent }) =>
        dispatch(spotSelected(nativeEvent.id))
      }
    >
      <UserPositionMarker />
      <SpotsMarkers />
    </MapView>
  );
};
