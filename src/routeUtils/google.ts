import { Linking } from 'react-native';

import { ICoordinates } from '../models';

// Docs: https://developers.google.com/maps/documentation/urls/guide

enum FormsOfTransportGoogle {
  CAR = 'driving',
  PUBLIC_TRANSPORT = 'transit',
  BY_FOOT = 'walking',
  BIKE = 'bicycling',
}

const getFindRouteFromCurrentLocationURLGoogle = (
  targetCoordinates: string,
  formOfTransport: FormsOfTransportGoogle,
) =>
  `https://www.google.com/maps/dir/?api=1&&destination=${targetCoordinates}&travelmode=${formOfTransport}`;

const getFindRouteURLGoogle = (
  sourceCoordinates: string,
  targetCoordinates: string,
  formOfTransport: FormsOfTransportGoogle,
) =>
  `https://www.google.com/maps/dir/?api=1&origin=${sourceCoordinates}&destination=${targetCoordinates}&travelmode=${formOfTransport}`;

export const findRouteGoogle = (source: ICoordinates, target: ICoordinates) => {
  const sourceCoordinates = `${source.latitude}, ${source.longitude}`;
  const targetCoordinates = `${target.latitude}, ${target.longitude}`;
  const findRouteURL = getFindRouteURLGoogle(
    sourceCoordinates,
    targetCoordinates,
    FormsOfTransportGoogle.PUBLIC_TRANSPORT,
  );

  return Linking.openURL(findRouteURL);
};

export const findRouteFromCurrentLocationGoogle = (target: ICoordinates) => {
  const targetCoordinates = `${target.latitude}, ${target.longitude}`;

  const findRouteURL = getFindRouteFromCurrentLocationURLGoogle(
    targetCoordinates,
    FormsOfTransportGoogle.CAR,
  );

  return Linking.openURL(findRouteURL);
};
