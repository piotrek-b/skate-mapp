import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserPositionMarker from './UserPositionMarker';
import SpotsMarkers from './SpotsMarkers';
import { spotSelected } from '../state/actions/selectedActions';

import LocationBasedMapContainer from './LocationBasedMapContainer';
import LocationBasedMapView from './LocationBasedMapView';
import { IState } from '../state/reducers';
import createLoadingSelector from '../state/loadingSelector';

const addingSpotLoadingSelector = createLoadingSelector(['ADD_SPOT']);

export default () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: IState) => state.account.isSignedIn);
  const isLoading = useSelector((state: IState) =>
    addingSpotLoadingSelector(state),
  );
  const mapRef: any = useRef(null);

  return (
    <LocationBasedMapContainer
      showHeader
      showAddButton={isSignedIn && !isLoading}
      mapRef={mapRef}
    >
      {({ initialLatitude, initialLongitude }) => (
        <>
          <LocationBasedMapView
            mapRef={mapRef}
            initialLatitude={initialLatitude}
            initialLongitude={initialLongitude}
            onPress={() => dispatch(spotSelected(null))}
            onMarkerPress={({ nativeEvent }) => {
              if (nativeEvent.id) {
                dispatch(spotSelected(nativeEvent.id));
              }
            }}
          >
            <SpotsMarkers />
            <UserPositionMarker mapRef={mapRef} />
          </LocationBasedMapView>
        </>
      )}
    </LocationBasedMapContainer>
  );
};
