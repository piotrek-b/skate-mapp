import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Icon } from 'native-base';

import { loadSpotsRequested } from '../state/actions/spotsActions';
import { ISpot } from '../models';

const styles = StyleSheet.create({
  pin: {
    fontSize: 40,
    color: '#fff',
  },
});

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
          <Icon
            style={styles.pin}
            name="md-pin"
            android="md-pin"
            ios="ios-pin"
          />
        </Marker>
      </Fragment>
    );
  });
};
