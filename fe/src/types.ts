export interface StreetInfo {
  id: number;
  streetName: string;
  streetType: {
    id: number;
    streetTypeName: string;
  };
  address: string;
  description: string;
  route: {
    coordinates: [number, number][];
  }; // Array of [lat, lng] coordinates
  images: IImage[];
  histories: { period: string; description: string }[]; // description is now HTML content
}

export interface IImage {
  id: string;
  imageUrl: string;
  description: string;
}

export interface MapState {
  center: [number, number];
  zoom: number;
}

export interface ProtomapsLayerProps {
  theme: "light" | "dark" | "white" | "grayscale" | "black";
}

export type Theme = "light" | "dark" | "white" | "grayscale" | "black";

export interface ThemeOption {
  value: Theme;
  vietnameseName: string;
}

export const themeOptions: ThemeOption[] = [
  { value: "light", vietnameseName: "Sáng" },
  { value: "dark", vietnameseName: "Tối" },
  { value: "white", vietnameseName: "Trắng" },
  { value: "grayscale", vietnameseName: "Xám" },
  { value: "black", vietnameseName: "Đen" }
];

// StreetSearch
export interface IStreetSearch {
  id: number;
  streetName: string;
  streetType: string;
  address: string;
  description: string;
  imageUrl: string;
}

export interface IStreetRoute {
  id: number;
  streetName: string;
  address: string;
  route: {
    coordinates: [number, number][];
  };
}
