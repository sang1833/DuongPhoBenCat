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

export interface ISearchBarProps {
  search?: string;
  setSearch: (search: string) => void;
}
