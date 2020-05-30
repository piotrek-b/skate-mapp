import React, { useRef, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Marker } from 'react-native-maps';

import UserPositionMarker from '../../map/UserPositionMarker';

import LocationBasedMapContainer from '../../map/LocationBasedMapContainer';
import LocationBasedMapView from '../../map/LocationBasedMapView';
import MiddleBottomChip from '../../MiddleBottomChip';
import { LatLngDeltaDefaults } from '../../consts';

type RouteParamsType = {
  Params: {
    initialLatLng: {
      latitude: number;
      longitude: number;
    };
  };
};

type ScreenRouteProp = RouteProp<RouteParamsType, 'Params'>;

export default () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();
  const mapRef = useRef(null);
  const [{ latitude, longitude }, setLatLng] = useState({
    latitude: route.params.initialLatLng.latitude,
    longitude: route.params.initialLatLng.longitude,
  });

  return (
    <LocationBasedMapContainer mapRef={mapRef}>
      {({ initialLatitude, initialLongitude }) => (
        <>
          <LocationBasedMapView
            mapRef={mapRef}
            initialLatitude={latitude || initialLatitude}
            initialLongitude={longitude || initialLongitude}
            onPress={({ nativeEvent }) => {
              mapRef.current.animateToRegion({
                latitude: nativeEvent.coordinate.latitude,
                longitude: nativeEvent.coordinate.longitude,
                latitudeDelta: LatLngDeltaDefaults.LATITUDE_DELTA,
                longitudeDelta: LatLngDeltaDefaults.LONGITUDE_DELTA,
              });
              setLatLng({ ...nativeEvent.coordinate });
            }}
            onMarkerPress={() => {}}
          >
            <UserPositionMarker mapRef={mapRef} />
            <Marker coordinate={{ latitude, longitude }} />
          </LocationBasedMapView>
          {latitude && longitude ? (
            <MiddleBottomChip
              onPress={() => {
                // @ts-ignore
                route.params.onSelect({ latitude, longitude });
                navigation.goBack();
              }}
              label="Save Location"
            />
          ) : null}
        </>
      )}
    </LocationBasedMapContainer>
  );
};
