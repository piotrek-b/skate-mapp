import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';

import { loadSpotsRequested } from '../state/actions/spotsActions';
import { ISpot } from '../models';
import Longboard from '../Longboard';
import IconMarker from '../IconMarker';

export default () => {
  const spotsIds = useSelector((state) => state.spots.allIds);
  const spotsById = useSelector((state) => state.spots.byId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSpotsRequested());
    // TODO: Think of excluding ESLint rule;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return spotsIds.map((id) => {
    const spot: ISpot = spotsById[id];
    const { latitude, longitude, name } = spot;

    return (
      <Fragment key={name}>
        <Marker identifier={spot.id} coordinate={{ latitude, longitude }}>
          <IconMarker
            icon={({ color, size }) => (
              <Longboard color={color} width={size} height={size} />
            )}
            iconColor="#383d7f"
            markerColor="#fff"
          />
        </Marker>
      </Fragment>
    );
  });
};
