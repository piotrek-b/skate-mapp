import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';

import { loadSpotsRequested } from '../state/actions/spotsActions';
import { ISpot } from '../models';
import { findRouteFromCurrentLocation } from '../routeUtils';

export default () => {
  const spots = useSelector((state) => state.spots.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSpotsRequested());
    // TODO: Think of excluding ESLint rule;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return spots.map(({ latitude, longitude, name }: ISpot) => (
    <Fragment key={name}>
      <Marker
        coordinate={{ latitude, longitude }}
        title={name}
        onPress={() => findRouteFromCurrentLocation({ latitude, longitude })}
      />
    </Fragment>
  ));
};
