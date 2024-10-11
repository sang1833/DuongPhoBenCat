export interface IStreetListContext {
  filter: string;
  setFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  isDesc: boolean;
  setIsDesc: (isDesc: boolean) => void;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export interface IStreetSearchList {
  streets: IStreetSearch[];
  totalPages: number;
}

export interface IStreetSearch {
  id: number;
  streetName: string;
  streetType: IStreetType;
  address: string;
  description: string;
  imageUrl: string;
  updatedDate: string; // You can use Date if you plan to parse it into a Date object
  createdDate: string; // You can use Date if you plan to parse it into a Date object
}

export interface IStreet {
  id: number;
  streetName: string;
  streetTypeId: number;
  address: string;
  description: string;
  imageUrl: string;
  images: IStreetImage[];
  updatedDate: string; // You can use Date if you plan to parse it into a Date object
  createdDate: string; // You can use Date if you plan to parse it into a Date object
  wayPoints: {
    coordinates: [number, number][];
  };
  route: {
    coordinates: [number, number][];
  };
}

export interface IStreetType {
  id: number;
  streetTypeName: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface IStreetTypeList {
  streetTypes: IStreetType[];
  totalPages?: number;
}

export interface IStreetTypeoption {
  value: number;
  label: string;
}

export interface IStreetImage {
  imageUrl?: string;
  publicId?: string;
  description?: string;
}

export interface IStreetHistory {
  id: string;
  period: string;
  description: string;
}
