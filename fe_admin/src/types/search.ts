export interface RouteResponse {
  data: {
    id?: number;
    streetName?: string;
    streetType?: string;
    description?: string;
    route?: {
      coordinates: [number, number][];
    };
  };
}
