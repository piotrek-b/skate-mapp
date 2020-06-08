import React from 'react';
import { List } from 'react-native-paper';

type RenderIcon = (props: any) => React.ReactNode;

interface IListItemProps {
  color: string;
  icon: string | RenderIcon;
  title: string;
  onPress: () => void;
}

export default ({ color, icon, title, onPress }: IListItemProps) => {
  return color ? (
    <List.Item
      title={title}
      left={(leftProps) => (
        <List.Icon {...leftProps} color={color} icon={icon} />
      )}
      titleStyle={{ color }}
      onPress={onPress}
    />
  ) : (
    <List.Item
      title={title}
      left={(leftProps) => <List.Icon {...leftProps} icon={icon} />}
      onPress={onPress}
    />
  );
};
