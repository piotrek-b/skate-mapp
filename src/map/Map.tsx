import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import UserPositionMarker from './UserPositionMarker';
import SpotsMarkers from './SpotsMarkers';
import { spotSelected } from '../state/actions/selectedActions';

import LocationBasedMapContainer from './LocationBasedMapContainer';
import LocationBasedMapView from './LocationBasedMapView';

export default () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  return (
    <LocationBasedMapContainer showAddButton showHeader mapRef={mapRef}>
      {({ initialLatitude, initialLongitude }) => (
        <LocationBasedMapView
          mapRef={mapRef}
          initialLatitude={initialLatitude}
          initialLongitude={initialLongitude}
          onPress={() => dispatch(spotSelected(null))}
          onMarkerPress={({ nativeEvent }) =>
            dispatch(spotSelected(nativeEvent.id))
          }
        >
          <UserPositionMarker mapRef={mapRef} />
          <SpotsMarkers />
        </LocationBasedMapView>
      )}
    </LocationBasedMapContainer>
  );
};
