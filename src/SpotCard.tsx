import React from 'react';
import { Button, Card } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import { ISpot } from './models';
import { findRouteFromCurrentLocation } from './routeUtils';
import { formatDistance } from './utils';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width - 20,
    left: 10,
    margin: 0,
    padding: 0,
    bottom: 8,
  },
  image: {
    height: 100,
    width: '100%',
    flex: 1,
    overflow: 'hidden',
  },
});

interface ISpotCardProps {
  distance: number;
  spot: ISpot;
}

const SpotCard = ({ distance, spot }: ISpotCardProps) => {
  return (
    <Card style={styles.container}>
      <Card.Cover style={styles.image} source={{ uri: spot.imageUrl }} />
      <Card.Title
        title={spot.name}
        subtitle={`(${formatDistance(distance)})`}
        right={(props) => (
          <Button
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            icon="navigation"
            onPress={() =>
              findRouteFromCurrentLocation({
                latitude: spot.latitude,
                longitude: spot.longitude,
              })
            }
          >
            Route
          </Button>
        )}
      />
    </Card>
  );
};

export default SpotCard;
