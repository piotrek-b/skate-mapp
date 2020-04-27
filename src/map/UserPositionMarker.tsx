import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// @ts-ignore
import me from '../../assets/me.png';
import { currentLocationChanged } from '../state/actions/currentLocationActions';

interface IUserLocationMarkerProps {
  mapRef: any;
}

export default ({ mapRef }: IUserLocationMarkerProps) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const currentCoordinates = useSelector(
    (state) => state.currentLocation.coordinates,
  );
  const isFollowingLocation = useSelector(
    (state) => state.currentLocation.following,
  );

  useEffect(() => {
    let watcher;
    const callback = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setError('Permission to access location was denied');
      }

      watcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 500,
          distanceInterval: 1,
        },
        ({ coords: { latitude, longitude } }) => {
          dispatch(currentLocationChanged({ latitude, longitude }));

          if (isFollowingLocation) {
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        },
      );
    };

    callback();

    return () => {
      if (watcher) {
        watcher.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowingLocation]);

  return error ? null : (
    <Marker
      image={me}
      coordinate={{ ...currentCoordinates }}
      title="U here"
      description="Cuz so"
    />
  );
};
