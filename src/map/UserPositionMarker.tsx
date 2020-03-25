import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// @ts-ignore
import me from '../../assets/me.png';
import { currentLocationChanged } from '../state/actions/currentLocationActions';

export default () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const currentCoordinates = useSelector(
    (state) => state.currentLocation.coordinates,
  );

  React.useEffect(() => {
    const callback = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setError('Permission to access location was denied');
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 500,
          distanceInterval: 1,
        },
        ({ coords: { latitude, longitude } }) => {
          dispatch(currentLocationChanged({ latitude, longitude }));
        },
      );
    };

    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return error ? null : (
    <Marker
      image={me}
      coordinate={{ ...currentCoordinates }}
      title="U here"
      description="Cuz so"
    />
  );
};
