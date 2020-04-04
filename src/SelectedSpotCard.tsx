import React from 'react';
import { useSelector } from 'react-redux';

import { IState } from './state/reducers';
import SpotCard from './SpotCard';

const SelectedSpotCard = () => {
  const selectedSpot = useSelector((state: IState) => state.selected.spot);
  return selectedSpot ? <SpotCard spot={selectedSpot} /> : null;
};

export default SelectedSpotCard;
