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

import Longboard from './Longboard';
import { ISpot } from './models';
import { spotSelected } from './state/actions/selectedActions';

const styles = StyleSheet.create({
  listItemBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default () => {
  const dispatch = useDispatch();
  const spotsIds = useSelector((state) => state.spots.allIds);
  const spotsById = useSelector((state) => state.spots.byId);
  const currentCoordinates = useSelector(
    (state) => state.currentLocation.coordinates,
  );
  const spotsWithDistance = useMemo(() => {
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

    return spotsWithNumericalDistance.map((spotWithDistance) => {
      let formattedDistance = '';

      if (spotWithDistance.distance > 1000) {
        formattedDistance = `${(spotWithDistance.distance / 1000).toFixed(
          2,
        )}km`;
      } else {
        formattedDistance = `${spotWithDistance.distance.toFixed(2)}m`;
      }

      return {
        spot: spotWithDistance.spot,
        distance: formattedDistance,
      };
    });
  }, [spotsIds, spotsById, currentCoordinates]);

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
                  <Longboard color="#888" width={40} height={40} />
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
