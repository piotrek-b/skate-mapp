import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { FAB, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { IState } from '../../state/reducers';
import { RouteNames } from '../../consts';

const styles = StyleSheet.create({
  fabGroup: {
    position: 'absolute',
    paddingBottom: 68,
  },
  locationButton: {
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
  const theme = useTheme();
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
              onPress: () =>
                navigation.navigate(RouteNames.ADD_SPOT, {
                  categories: [],
                  title: '',
                  image: [],
                  location: {
                    latitude: 0,
                    longitude: 0,
                  },
                }),
            },
          ]}
          onStateChange={() => setIsOpen(!isOpen)}
          fabStyle={{ backgroundColor: theme.colors.surface }}
          style={styles.fabGroup}
        />
      ) : null}
      <FAB
        color={
          isFollowingLocation ? theme.colors.primary : theme.colors.backdrop
        }
        style={[
          styles.locationButton,
          { backgroundColor: theme.colors.surface },
        ]}
        icon="crosshairs-gps"
        onPress={onLocationButtonPress}
      />
    </>
  );
};
