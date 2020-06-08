import React from 'react';
import { useSelector } from 'react-redux';

import { getDistance } from 'geolib';
import { IState } from '../../state/reducers';
import SpotCard from '../shared/SpotCard';

const SelectedSpotCard = () => {
  const selectedSpotId = useSelector((state: IState) => state.selected.spotId);
  const selectedSpot = useSelector(
    (state: IState) => state.spots.byId[selectedSpotId],
  );
  const currentCoordinates = useSelector(
    (state: IState) => state.currentLocation.coordinates,
  );
  return selectedSpot ? (
    <SpotCard
      distance={getDistance(
        {
          latitude: selectedSpot.latitude,
          longitude: selectedSpot.longitude,
        },
        currentCoordinates,
      )}
      spot={selectedSpot}
    />
  ) : null;
};

export default SelectedSpotCard;
