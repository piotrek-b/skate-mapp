import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import {
  getNominatimGeoJSONForLatLng,
  parseNominatimResponseToDisplayName,
} from '../../utils';
import ListItem from './ListItem';
import getItemColor from '../getItemColor';

interface ILatLng {
  latitude: number;
  longitude: number;
}

interface IAddLocationListItemProps {
  error?: boolean;
  value: ILatLng;
  onChange: (latLng: ILatLng) => void;
}

export default ({ error, value, onChange }: IAddLocationListItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [name, setName] = useState('');

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
      onPress={() =>
        navigation.navigate('AddLocationMap', {
          onSelect: onChange,
          initialLatLng: value,
        })
      }
    />
  );
};
