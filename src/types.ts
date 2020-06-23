export type RootStackParamList = {
  Main: undefined;
  AddSpot: {
    categories: string[];
    imageUri: string;
    location: { latitude: number; longitude: number };
    title: string;
  };
};

export enum SignInPlatformType {
  Facebook = 'Facebook',
  Google = 'Google',
}
