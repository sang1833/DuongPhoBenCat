//   street
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
  images: {
    imageUrl: string;
    publicId: string;
    description: string;
  }[];
  histories: {
    period: string;
    description: string;
  }[];
}
export interface UpdateStreetRequestDto {
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
  images: {
    imageUrl: string;
    publicId: string;
    description: string;
  }[];
  histories: {
    id?: number;
    period: string;
    description: string;
  }[];
}

// street type
export interface CreateStreetTypeRequestDto {
  streetTypeName: string;
}
export interface UpdateStreetTypeRequestDto {
  streetTypeName: string;
}

// auth
export interface LoginRequestDto {
  username: string;
  password: string;
}
