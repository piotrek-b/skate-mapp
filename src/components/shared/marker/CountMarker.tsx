import React from 'react';
import { Title } from 'react-native-paper';

import CustomMarker from './CustomMarker';

export default ({
  count,
  textColor,
  markerColor,
}: {
  count: number;
  textColor: string;
  markerColor: string;
}) => {
  return (
    <CustomMarker
      borderColor={textColor}
      markerColor={markerColor}
      markerSize={40}
    >
      <Title style={{ color: textColor }}>{count}</Title>
    </CustomMarker>
  );
};
