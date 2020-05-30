import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';
import {
  getNominatimGeoJSONForLatLng,
  parseNominatimResponseToDisplayName,
} from '../../utils';

interface ILatLng {
  latitude: number;
  longitude: number;
}

interface IAddLocationListItemProps {
  value: ILatLng;
  onChange: (latLng: ILatLng) => void;
}

export default ({ value, onChange }: IAddLocationListItemProps) => {
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
    <List.Item
      title={value.longitude && value.latitude ? name : 'Add Location'}
      left={(props) => <List.Icon {...props} icon="map-marker" />}
      onPress={() =>
        navigation.navigate('AddLocationMap', {
          onSelect: onChange,
          initialLatLng: value,
        })
      }
    />
  );
};
