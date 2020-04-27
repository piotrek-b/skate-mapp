import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Dimensions, StyleSheet, View } from 'react-native';

import UserPositionMarker from './UserPositionMarker';
import SpotsMarkers from './SpotsMarkers';
import mapStyle from './mapStyle.json';
import { spotSelected } from '../state/actions/selectedActions';

import FabButton from '../FabButton';
import {
  currentLocationFollowRequested,
  currentLocationUnFollowRequested,
} from '../state/actions/currentLocationActions';
import Header from '../header/Header';

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 0,
  },
});

export default () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
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
    <View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle.style}
        style={styles.mapStyle}
        region={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPress={() => dispatch(spotSelected(null))}
        onMarkerPress={({ nativeEvent }) =>
          dispatch(spotSelected(nativeEvent.id))
        }
        onTouchStart={() => {
          dispatch(currentLocationUnFollowRequested());
        }}
      >
        <UserPositionMarker mapRef={mapRef} />
        <SpotsMarkers />
      </MapView>
      <Header mapRef={mapRef} />
      <FabButton
        onPress={async () => {
          const location = await Location.getCurrentPositionAsync({});
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          dispatch(currentLocationFollowRequested());
        }}
      />
    </View>
  );
};
