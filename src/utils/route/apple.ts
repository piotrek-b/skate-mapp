import { Linking } from 'react-native';

import { ICoordinates } from '../../models';

// Docs: https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html

export enum FormsOfTransportApple {
  CAR = 'd',
  PUBLIC_TRANSPORT = 'r',
  BY_FOOT = 'w',
}

const getFindRouteFromCurrentLocationURLApple = (
  targetCoordinates: string,
  formOfTransport: FormsOfTransportApple,
) =>
  `https://maps.apple.com/?daddr=${targetCoordinates}&dirflg=${formOfTransport}`;

const getFindRouteURLApple = (
  sourceCoordinates: string,
  targetCoordinates: string,
  formOfTransport: FormsOfTransportApple,
) =>
  `https://maps.apple.com/?saddr=${sourceCoordinates}&daddr=${targetCoordinates}&dirflg=${formOfTransport}`;

export const findRouteApple = (source: ICoordinates, target: ICoordinates) => {
  const sourceCoordinates = `${source.latitude}, ${source.longitude}`;
  const targetCoordinates = `${target.latitude}, ${target.longitude}`;
  const findRouteURL = getFindRouteURLApple(
    sourceCoordinates,
    targetCoordinates,
    FormsOfTransportApple.PUBLIC_TRANSPORT,
  );

  return Linking.openURL(findRouteURL);
};

export const findRouteFromCurrentLocationApple = (target: ICoordinates) => {
  const targetCoordinates = `${target.latitude}, ${target.longitude}`;

  const findRouteURL = getFindRouteFromCurrentLocationURLApple(
    targetCoordinates,
    FormsOfTransportApple.PUBLIC_TRANSPORT,
  );

  return Linking.openURL(findRouteURL);
};
