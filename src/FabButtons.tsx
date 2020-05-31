import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { IState } from './state/reducers';

const styles = StyleSheet.create({
  fabGroup: {
    position: 'absolute',
    paddingBottom: 68,
  },
  starButton: {
    backgroundColor: '#fff',
  },
  locationButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

interface IFabButtonsProps {
  showAddButton?: boolean;
  onLocationButtonPress: () => void;
}

export default (
  { showAddButton, onLocationButtonPress }: IFabButtonsProps = {
    showAddButton: false,
    onLocationButtonPress: () => {},
  },
) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFollowingLocation = useSelector(
    (state: IState) => state.currentLocation.following,
  );
  const navigation = useNavigation();
  const selectedSpotId = useSelector((state: IState) => state.selected.spotId);
  return selectedSpotId ? null : (
    <>
      {showAddButton ? (
        <FAB.Group
          visible
          open={isOpen}
          icon="star"
          actions={[
            {
              label: 'Add Spot',
              icon: 'map-marker-check',
              onPress: () => navigation.navigate('AddSpot'),
            },
          ]}
          onStateChange={() => setIsOpen(!isOpen)}
          fabStyle={styles.starButton}
          style={styles.fabGroup}
        />
      ) : null}
      <FAB
        color={isFollowingLocation ? '#383d7f' : '#888'}
        style={styles.locationButton}
        icon="crosshairs-gps"
        onPress={onLocationButtonPress}
      />
    </>
  );
};
