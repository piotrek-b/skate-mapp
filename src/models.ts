export interface ISpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  matching?: string[];
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}
