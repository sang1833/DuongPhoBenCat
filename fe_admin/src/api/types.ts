//   make interface for this
export interface CreateStreetRequestDto {
  streetName: string;
  streetTypeId: number;
  address: string;
  imageUrl: string;
  description: string;
  wayPoints: {
    coordinates: number[][];
  };
  route: {
    coordinates: number[][];
  };
  streetImages: {
    imageUrl: string;
    publicId: string;
    description: string;
  }[];
}
