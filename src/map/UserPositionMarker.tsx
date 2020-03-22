import React from 'react';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// @ts-ignore
import me from '../../assets/me.png';

export default () => {
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [error, setError] = React.useState('');

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
          distanceInterval: 1
        },
        (loc) => {
          setLatitude(loc.coords.latitude);
          setLongitude(loc.coords.longitude);
        }
      );
    };

    callback();
  }, []);

  return error ? null : (
    <Marker
      image={me}
      coordinate={{ latitude, longitude }}
      title="U here"
      description="Cuz so"
    />
  );
};
