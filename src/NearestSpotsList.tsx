import React from 'react';
import { useSelector } from 'react-redux';
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
import { findRouteFromCurrentLocation } from './routeUtils';

export default () => {
  const spots = useSelector((state) => state.spots.items);
  const currentCoordinates = useSelector(
    (state) => state.currentLocation.coordinates,
  );
  const spotsWithDistance = React.useMemo(() => {
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
                onPress={() =>
                  findRouteFromCurrentLocation({
                    latitude: spot.latitude,
                    longitude: spot.longitude,
                  })
                }
              >
                <Body
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
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
