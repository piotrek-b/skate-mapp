import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { Button, Card, CardItem, H3, Body, Text, Icon } from 'native-base';
import { ISpot } from './models';
import { findRouteFromCurrentLocation } from './routeUtils';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width - 2,
    margin: 0,
    padding: 0,
    bottom: 24,
  },
  image: {
    height: 100,
    width: '100%',
    flex: 1,
    overflow: 'hidden',
  },
  button: {
    borderColor: 'black',
  },
  icon: {
    color: '#888',
  },
  text: {
    textTransform: 'capitalize',
    color: '#000',
  },
});

interface ISpotCardProps {
  spot: ISpot;
}

const SpotCard = ({ spot }: ISpotCardProps) => {
  return (
    <Card style={styles.container}>
      <CardItem>
        <Body>
          <Image
            source={spot.imageUrl as ImageSourcePropType}
            style={styles.image}
          />
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <H3>{spot.name}</H3>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <Button
            iconLeft
            rounded
            bordered
            style={styles.button}
            onPress={() =>
              findRouteFromCurrentLocation({
                latitude: spot.latitude,
                longitude: spot.longitude,
              })
            }
          >
            <Icon
              style={styles.icon}
              name="md-navigate"
              android="md-navigate"
              ios="ios-navigate"
            />
            <Text style={styles.text}>Trasa</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  );
};

export default SpotCard;