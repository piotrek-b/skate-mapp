import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Longboard from '../../Longboard';
import { IState } from '../../state/reducers';
import ListItem from './ListItem';
import getItemColor from '../getItemColor';

interface IAddLocationListItemProps {
  error?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

export default ({ error, value, onChange }: IAddLocationListItemProps) => {
  const navigation = useNavigation();
  const categoriesById = useSelector((state: IState) => state.categories.byId);
  return (
    <ListItem
      color={getItemColor(error, value.length > 0)}
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
