import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import {
  getNominatimGeoJSONForLatLng,
  parseNominatimResponseToDisplayName,
} from '../../../utils/utils';
import ListItem from './ListItem';
import getItemColor from '../getItemColor';
import { RouteNames } from '../../../consts';

interface ILatLng {
  latitude: number;
  longitude: number;
}

interface IAddLocationListItemProps {
  error?: boolean;
  value: ILatLng;
}

export default ({ error, value }: IAddLocationListItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const onAddLocationListItemPress = useCallback(
    () =>
      navigation.navigate(RouteNames.ADD_LOCATION_MAP, {
        initialLatLng: value,
      }),
    [navigation, value],
  );

  useEffect(() => {
    const callback = async () => {
      const resJson = await getNominatimGeoJSONForLatLng(
        value.latitude,
        value.longitude,
      );
      const displayName = parseNominatimResponseToDisplayName(resJson);

      setName(displayName);
    };

    callback();
  }, [value]);

  return (
    <ListItem
      color={getItemColor(error, value.latitude && value.longitude, theme)}
      title={value.longitude && value.latitude ? name : 'Add Location'}
      icon="map-marker"
      onPress={onAddLocationListItemPress}
    />
  );
};
