import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Icon } from 'native-base';

import { loadSpotsRequested } from '../state/actions/spotsActions';
import { ISpot } from '../models';
import { spotSelected } from '../state/actions/selectedActions';

const styles = StyleSheet.create({
  pin: {
    fontSize: 40,
    color: '#fff',
  },
});

export default () => {
  const spots = useSelector((state) => state.spots.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSpotsRequested());
    // TODO: Think of excluding ESLint rule;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return spots.map(({ latitude, longitude, name, imageUrl }: ISpot) => (
    <Fragment key={name}>
      <Marker
        coordinate={{ latitude, longitude }}
        onPress={() =>
          dispatch(spotSelected({ latitude, longitude, name, imageUrl }))
        }
      >
        <Icon style={styles.pin} name="md-pin" android="md-pin" ios="ios-pin" />
      </Marker>
    </Fragment>
  ));
};
