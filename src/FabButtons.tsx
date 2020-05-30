import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { IState } from './state/reducers';

const styles = StyleSheet.create({
  plusButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    margin: 16,
    right: 8,
    bottom: 68,
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
  const isFollowingLocation = useSelector(
    (state: IState) => state.currentLocation.following,
  );
  const isSignedIn = useSelector((state: IState) => state.account.isSignedIn);
  const navigation = useNavigation();
  const selectedSpotId = useSelector((state: IState) => state.selected.spotId);
  return selectedSpotId ? null : (
    <>
      {isSignedIn && showAddButton && (
        <FAB
          small
          color="#383d7f"
          style={styles.plusButton}
          icon="plus"
          onPress={() => navigation.navigate('AddSpot')}
        />
      )}
      <FAB
        color={isFollowingLocation ? '#383d7f' : '#888'}
        style={styles.locationButton}
        icon="crosshairs-gps"
        onPress={onLocationButtonPress}
      />
    </>
  );
};
