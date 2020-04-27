import React from 'react';
import { useSelector } from 'react-redux';
import { Icon, Fab } from 'native-base';
import { StyleSheet } from 'react-native';
import { IState } from './state/reducers';

const styles = StyleSheet.create({
  locationButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 1,
  },
});

interface IFabButtonProps {
  onPress: () => void;
}

export default ({ onPress }: IFabButtonProps) => {
  const isFollowingLocation = useSelector(
    (state: IState) => state.currentLocation.following,
  );
  const selectedSpotId = useSelector((state: IState) => state.selected.spotId);
  return selectedSpotId ? null : (
    <Fab
      active={false}
      direction="up"
      style={styles.locationButton}
      position="bottomRight"
      onPress={onPress}
    >
      <Icon
        name="md-locate"
        android="md-locate"
        ios="ios-locate"
        style={{ color: isFollowingLocation ? '#383d7f' : '#888' }}
      />
    </Fab>
  );
};
