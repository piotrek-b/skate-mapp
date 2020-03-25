import { Linking } from 'react-native';
import { ICoordinates } from './models';

// eslint-disable-next-line import/prefer-default-export
export const findRoute = (source: ICoordinates, target: ICoordinates) =>
  Linking.openURL(
    `https://www.google.com/maps/dir/${source.latitude},${source.longitude}/${target.latitude},${target.longitude}/data=!3m1!4b1!4m2!4m1!3e1`,
  );
