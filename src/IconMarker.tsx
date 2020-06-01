import React from 'react';
import { IconButton } from 'react-native-paper';
// eslint-disable-next-line import/no-unresolved
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

// TODO: Difference in styles on Android and iOS (icon sizing).
export default ({
  icon,
  iconColor,
  markerColor,
}: {
  icon: IconSource;
  iconColor: string;
  markerColor: string;
}) => {
  return (
    <>
      <IconButton
        color={iconColor}
        size={20}
        style={{ backgroundColor: markerColor }}
        icon={icon}
      />
    </>
  );
};
