import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserPositionMarker from './UserPositionMarker';
import SpotsMarkers from './SpotsMarkers';
import { spotSelected } from '../state/actions/selectedActions';

import LocationBasedMapContainer from './LocationBasedMapContainer';
import LocationBasedMapView from './LocationBasedMapView';
import { IState } from '../state/reducers';

export default () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: IState) => state.account.isSignedIn);
  const mapRef = useRef(null);

  return (
    <LocationBasedMapContainer
      showHeader
      showAddButton={isSignedIn}
      mapRef={mapRef}
    >
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
