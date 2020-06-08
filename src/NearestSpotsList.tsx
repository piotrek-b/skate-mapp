import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Icon,
  Body,
  Right,
  Container,
  Content,
  Text,
  List,
  ListItem,
} from 'native-base';
import { getDistance } from 'geolib';
import { useTheme } from 'react-native-paper';

import Longboard from './Longboard';
import { ISpot } from './models';
import { spotSelected } from './state/actions/selectedActions';
import { formatDistance } from './utils';

const styles = StyleSheet.create({
  listItemBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const getSpotsWithDistance = (
  spotsIds,
  spotsById,
  currentCoordinates,
) => () => {
  const spotsWithNumericalDistance = spotsIds.map((id) => {
    const spot: ISpot = spotsById[id];
    const distance = getDistance(
      {
        latitude: spot.latitude,
        longitude: spot.longitude,
      },
      currentCoordinates,
    );

    return {
      distance,
      spot,
    };
  });

  spotsWithNumericalDistance.sort((a, b) => a.distance - b.distance);

  return spotsWithNumericalDistance.map((spotWithDistance) => ({
    spot: spotWithDistance.spot,
    distance: formatDistance(spotWithDistance.distance),
  }));
};

export default () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const spotsIds = useSelector((state) => state.spots.allIds);
  const spotsById = useSelector((state) => state.spots.byId);
  const currentCoordinates = useSelector(
    (state) => state.currentLocation.coordinates,
  );
  const spotsWithDistance = useMemo(
    getSpotsWithDistance(spotsIds, spotsById, currentCoordinates),
    [spotsIds, spotsById, currentCoordinates],
  );

  return (
    <Container>
      <Content>
        <List>
          {spotsWithDistance.map((spotWithDist, arr, index) => {
            const { distance, spot } = spotWithDist;

            return (
              <ListItem
                key={spot.name}
                last={index === arr.length - 1}
                onPress={() => dispatch(spotSelected(spot.id))}
              >
                <Body style={styles.listItemBody}>
                  <Longboard
                    color={theme.colors.backdrop}
                    width={40}
                    height={40}
                  />
                  <Text>
                    {spot.name} ({distance})
                  </Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};
