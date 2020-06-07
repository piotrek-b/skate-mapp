import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';

import { loadSpotsRequested } from '../state/actions/spotsActions';
import Longboard from '../Longboard';
import IconMarker from '../IconMarker';
import { RegionContext } from './LocationBasedMapView';
import { getCluster } from '../utils';
import CountMarker from '../CountMarker';

const renderMarker = (marker, index) => {
  const key = index + marker.geometry.coordinates[0];

  const children = marker.properties ? (
    <CountMarker
      textColor="#383d7f"
      markerColor="#fff"
      count={marker.properties.point_count}
    />
  ) : (
    <IconMarker
      icon={({ color, size }) => (
        <Longboard color={color} width={size} height={size} />
      )}
      iconColor="#383d7f"
      markerColor="#fff"
    />
  );

  return (
    <Marker
      identifier={marker.identifier}
      key={key}
      coordinate={{
        latitude: marker.geometry.coordinates[1],
        longitude: marker.geometry.coordinates[0],
      }}
    >
      {children}
    </Marker>
  );
};

export default () => {
  const region = useContext(RegionContext);
  const spotsIds = useSelector((state) => state.spots.allIds);
  const spotsById = useSelector((state) => state.spots.byId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSpotsRequested());
    // TODO: Think of excluding ESLint rule;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (spotsIds.length === 0) {
    return null;
  }

  const allCoords = spotsIds.map((spotId) => ({
    geometry: {
      coordinates: [spotsById[spotId].longitude, spotsById[spotId].latitude],
    },
    identifier: spotId,
  }));

  const cluster = getCluster(allCoords, region);

  return (
    <>{cluster.markers.map((marker, index) => renderMarker(marker, index))}</>
  );
};
