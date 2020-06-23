import React, { useCallback, useRef, useState } from 'react';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationState,
  CommonActions,
} from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import { IconButton, useTheme } from 'react-native-paper';

import UserPositionMarker from '../../shared/map/UserPositionMarker';

import LocationBasedMapContainer from '../../shared/map/LocationBasedMapContainer';
import LocationBasedMapView from '../../shared/map/LocationBasedMapView';
import MiddleBottomChip from '../../shared/MiddleBottomChip';
import { LatLngDeltaDefaults, RouteNames } from '../../../consts';

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
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();
  const mapRef = useRef(null);
  const [{ latitude, longitude }, setLatLng] = useState({
    latitude: route.params.initialLatLng.latitude,
    longitude: route.params.initialLatLng.longitude,
  });

  const locationIsSelected = latitude && longitude;

  const onMiddleChipPress = useCallback(() => {
    if (locationIsSelected) {
      navigation.dispatch((state: NavigationState) => {
        const routes = state.routes.filter(
          (r) => r.name !== RouteNames.ADD_CATEGORIES,
        );
        const lastRoute = routes[routes.length - 1];
        lastRoute.params = {
          ...lastRoute.params,
          location: { latitude, longitude },
        };

        return CommonActions.reset({
          ...state,
          stale: true,
          routes,
          index: routes.length - 1,
        });
      });
    }
  }, [latitude, longitude, locationIsSelected, navigation]);

  const onMapViewPress = useCallback(({ nativeEvent }) => {
    mapRef.current.animateToRegion({
      latitude: nativeEvent.coordinate.latitude,
      longitude: nativeEvent.coordinate.longitude,
      latitudeDelta: LatLngDeltaDefaults.LATITUDE_DELTA,
      longitudeDelta: LatLngDeltaDefaults.LONGITUDE_DELTA,
    });
    setLatLng({ ...nativeEvent.coordinate });
  }, []);

  return (
    <LocationBasedMapContainer mapRef={mapRef}>
      {({ initialLatitude, initialLongitude }) => (
        <>
          <LocationBasedMapView
            mapRef={mapRef}
            initialLatitude={latitude || initialLatitude}
            initialLongitude={longitude || initialLongitude}
            onPress={onMapViewPress}
            onMarkerPress={() => {}}
          >
            <UserPositionMarker mapRef={mapRef} />
            <Marker coordinate={{ latitude, longitude }}>
              <IconButton
                color={theme.colors.surface}
                size={50}
                icon="map-marker-check"
              />
            </Marker>
          </LocationBasedMapView>
          <MiddleBottomChip
            onPress={onMiddleChipPress}
            label={
              locationIsSelected ? 'Save location' : 'Click to select location'
            }
          />
        </>
      )}
    </LocationBasedMapContainer>
  );
};
