import React from 'react';
import { IconButton } from 'react-native-paper';
// eslint-disable-next-line import/no-unresolved
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

import CustomMarker from './CustomMarker';

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
    <CustomMarker
      borderColor={iconColor}
      markerColor={markerColor}
      markerSize={40}
    >
      <IconButton
        color={iconColor}
        size={20}
        style={{
          backgroundColor: markerColor,
        }}
        icon={icon}
      />
    </CustomMarker>
  );
};
