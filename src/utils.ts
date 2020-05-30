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

export const parseNominatimResponseToBoxCoordinates = (resJson) => {
  const mostInteresting = resJson.features[0];
  return [
    {
      latitude: mostInteresting.bbox[1],
      longitude: mostInteresting.bbox[0],
    },
    {
      latitude: mostInteresting.bbox[3],
      longitude: mostInteresting.bbox[2],
    },
  ];
};

export const parseNominatimResponseToDisplayName = (resJson) => {
  const mostInteresting = resJson.features[0];
  return mostInteresting.properties.display_name;
};

export const getNominatimGeoJSONForQuery = async (query) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}&format=geojson`,
  );
  const resJson = await res.json();

  return resJson;
};

export const getNominatimGeoJSONForLatLng = async (latitude, longitude) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=geojson`,
  );
  const resJson = await res.json();

  return resJson;
};
