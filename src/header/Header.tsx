import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

import Longboard from '../Longboard';
import { IState } from '../state/reducers';
import { ISpot } from '../models';
import { currentLocationUnFollowRequested } from '../state/actions/currentLocationActions';
import SearchBar from './SearchBar';

const SearchBarStylesConsts = {
  top: 40,
  height: 50,
  width: Dimensions.get('window').width - 80,
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
  },
  searchBar: {
    position: 'absolute',
    top: SearchBarStylesConsts.top,
    height: SearchBarStylesConsts.height,
    width: SearchBarStylesConsts.width,
    marginLeft: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  searchBarEnd: {
    position: 'absolute',
    top: SearchBarStylesConsts.top,
    left: SearchBarStylesConsts.width + 10,
    height: SearchBarStylesConsts.height,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  scrollView: {
    top: SearchBarStylesConsts.top + SearchBarStylesConsts.height + 15,
  },
  chip: {
    marginLeft: 10,
    backgroundColor: '#fafafa',
  },
});

const FIT_TO_COORDINATES_OPTIONS = {
  animated: true,
  edgePadding: {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60,
  },
};

export default ({ mapRef }: { mapRef: any }) => {
  const dispatch = useDispatch();
  const spotsIds = useSelector((state: IState) => state.spots.allIds);
  const spotsById = useSelector((state: IState) => state.spots.byId);
  const categoriesById = useSelector((state: IState) => state.categories.byId);
  const categoriesIds = useSelector((state: IState) => state.categories.ids);
  const getLatLngOfMatchingSpots = useCallback(
    (key) => {
      return spotsIds
        .filter((id) => {
          const spot: ISpot = spotsById[id];

          return spot.matching ? spot.matching.includes(key) : false;
        })
        .map((id) => {
          const spot: ISpot = spotsById[id];

          return {
            latitude: spot.latitude,
            longitude: spot.longitude,
          };
        });
    },
    [spotsIds, spotsById],
  );
  return (
    <View style={styles.view}>
      <SearchBar mapRef={mapRef} />
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {categoriesIds.map((id) => {
          const category = categoriesById[id];
          return (
            <Chip
              key={category.id}
              style={styles.chip}
              icon={({ color, size }) => (
                <Longboard color={color} width={size} height={size} />
              )}
              onPress={() => {
                const filteredArrayLatLng = getLatLngOfMatchingSpots(
                  category.id,
                );

                if (filteredArrayLatLng.length > 0) {
                  mapRef.current.fitToCoordinates(
                    filteredArrayLatLng,
                    FIT_TO_COORDINATES_OPTIONS,
                  );
                  dispatch(currentLocationUnFollowRequested());
                }
              }}
            >
              {category.title}
            </Chip>
          );
        })}
        <Chip style={styles.chip} icon="dots-horizontal">
          More
        </Chip>
      </ScrollView>
    </View>
  );
};
