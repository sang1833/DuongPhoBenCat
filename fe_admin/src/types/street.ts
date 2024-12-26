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
  isApproved: boolean;
}

export interface IStreet {
  id: number;
  streetName: string;
  streetTypeId: number;
  address: string;
  description: string;
  imageUrl: string;
  isApproved: boolean;
  weight: number;
  opacity: number;
  color: string;
  images: IStreetImage[];
  histories: IStreetHistory[];
  updatedDate: string; // You can use Date if you plan to parse it into a Date object
  createdDate: string; // You can use Date if you plan to parse it into a Date object
  wayPoints: {
    coordinates: [number, number][];
  };
  route: {
    coordinates: [number, number][];
  };
  manualWayPoints: {
    coordinates: [number, number][];
  };
  manualRoute: {
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

export interface ISelectOption {
  value: number | string;
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
