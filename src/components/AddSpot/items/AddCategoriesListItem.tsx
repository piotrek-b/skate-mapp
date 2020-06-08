import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';

import Longboard from '../../shared/Longboard';
import { IState } from '../../../state/reducers';
import ListItem from './ListItem';
import getItemColor from '../getItemColor';

interface IAddLocationListItemProps {
  error?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

export default ({ error, value, onChange }: IAddLocationListItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const categoriesById = useSelector((state: IState) => state.categories.byId);
  return (
    <ListItem
      color={getItemColor(error, value.length > 0, theme)}
      title={
        value.length > 0
          ? value.map((id) => categoriesById[id].title).join(', ')
          : 'Add Categories'
      }
      icon={({ color, size }) => (
        <Longboard color={color} width={size} height={size} />
      )}
      onPress={() =>
        navigation.navigate('AddCategories', {
          onSelect: onChange,
          categoriesIds: value,
        })
      }
    />
  );
};
