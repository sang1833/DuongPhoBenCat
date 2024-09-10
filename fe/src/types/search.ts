export interface RouteResponse {
  id?: number;
  streetName?: string;
  streetType?: string;
  description?: string;
  route?: {
    coordinates: [number, number][];
  };
}

export interface SearchResponse {
  data: RouteResponse[];
}

export type CustomRespone = {
  data: {
    route: {
      coordinates: [number, number][];
    };
  };
};
