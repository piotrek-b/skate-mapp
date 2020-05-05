import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dimensions, StyleSheet } from 'react-native';
import { Avatar, Searchbar, Surface } from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';

// @ts-ignore
import me from '../../assets/me.png';
import { currentLocationUnFollowRequested } from '../state/actions/currentLocationActions';
import {
  getNominatimGeoJSONForQuery,
  parseNominatimResponseToBoxCoordinates,
} from '../utils';

const SearchBarStylesConsts = {
  top: 40,
  height: 50,
  width: Dimensions.get('window').width - 80,
};

const styles = StyleSheet.create({
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
});

export default ({ mapRef }: { mapRef: any }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Searchbar
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
        placeholder="Search"
        onSubmitEditing={async ({ nativeEvent }) => {
          const geoJSON = await getNominatimGeoJSONForQuery(nativeEvent.text);
          mapRef.current.fitToCoordinates(
            parseNominatimResponseToBoxCoordinates(geoJSON),
            { animated: true },
          );
          dispatch(currentLocationUnFollowRequested());
        }}
      />
      <Surface
        style={styles.searchBarEnd}
        onTouchStart={() => navigation.navigate('Profile')}
      >
        <Avatar.Image size={40} source={me} />
      </Surface>
    </>
  );
};
