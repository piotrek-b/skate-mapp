// eslint-disable-next-line import/prefer-default-export
export const formatDistance = (distance) => {
  let formattedDistance = '';

  if (distance > 1000) {
    formattedDistance = `${(distance / 1000).toFixed(2)}km`;
  } else {
    formattedDistance = `${distance.toFixed(2)}m`;
  }

  return formattedDistance;
};
