import Supercluster from 'supercluster';

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

function getZoomLevel(longitudeDelta) {
  const angle = longitudeDelta;
  return Math.round(Math.log(360 / angle) / Math.LN2);
}

export const getCluster = (places, region) => {
  const cluster = new Supercluster({
    radius: 40,
    maxZoom: 16,
  });

  let markers = [];

  try {
    const padding = 0;

    cluster.load(places);

    markers = cluster.getClusters(
      [
        region.longitude - region.longitudeDelta * (0.5 + padding),
        region.latitude - region.latitudeDelta * (0.5 + padding),
        region.longitude + region.longitudeDelta * (0.5 + padding),
        region.latitude + region.latitudeDelta * (0.5 + padding),
      ],
      getZoomLevel(region.longitudeDelta),
    );
  } catch (e) {
    throw new Error(`Failed to create cluster (${e}).`);
  }

  return {
    markers,
    cluster,
  };
};
