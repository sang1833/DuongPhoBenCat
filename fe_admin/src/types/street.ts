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
  streetType: string;
  address: string;
  description: string;
  imageUrl: string;
  updatedDate: string; // You can use Date if you plan to parse it into a Date object
  createdDate: string; // You can use Date if you plan to parse it into a Date object
}
