import React from 'react';
import { useSelector } from 'react-redux';

import { IState } from './state/reducers';
import SpotCard from './SpotCard';

const SelectedSpotCard = () => {
  const selectedSpotId = useSelector((state: IState) => state.selected.spotId);
  const selectedSpot = useSelector(
    (state: IState) => state.spots.byId[selectedSpotId],
  );
  return selectedSpot ? <SpotCard spot={selectedSpot} /> : null;
};

export default SelectedSpotCard;
