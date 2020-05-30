import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { View } from 'react-native';
import Header from '../header/Header';
import FabButtons from '../FabButtons';
import { LatLngDeltaDefaults } from '../consts';
import { currentLocationFollowRequested } from '../state/actions/currentLocationActions';

interface IInitialLatLng {
  initialLatitude: number;
  initialLongitude: number;
}

interface ILocationBasedMapContainerProps {
  children: (initialLatLng: IInitialLatLng) => React.ReactNode;
  showAddButton?: boolean;
  showHeader?: boolean;
  mapRef: any;
}

export default ({
  children,
  showAddButton,
  showHeader,
  mapRef,
}: ILocationBasedMapContainerProps) => {
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
    <View>
      {children({ initialLatitude, initialLongitude })}
      {showHeader ? <Header mapRef={mapRef} /> : null}
      <FabButtons
        showAddButton={showAddButton}
        onLocationButtonPress={async () => {
          const location = await Location.getCurrentPositionAsync({});
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LatLngDeltaDefaults.LATITUDE_DELTA,
            longitudeDelta: LatLngDeltaDefaults.LONGITUDE_DELTA,
          });
          dispatch(currentLocationFollowRequested());
        }}
      />
    </View>
  );
};
