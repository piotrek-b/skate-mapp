import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector, useMemo } from 'react-redux';
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
  const spots = useSelector((state) => state.spots.items);
  const currentCoordinates = useSelector(
    (state) => state.currentLocation.coordinates,
  );
  const dispatch = useDispatch();
  const spotsWithDistance = useMemo(() => {
    const spotsWithNumericalDistance = spots.map((spot: ISpot) => {
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
  }, [spots, currentCoordinates]);

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
                onPress={() => dispatch(spotSelected(spot))}
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
