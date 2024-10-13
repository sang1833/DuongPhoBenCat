export interface StreetInfo {
  id: string;
  name: string;
  address: string;
  description: string;
  route: [number, number][]; // Array of [lat, lng] coordinates
  images: string[];
  history: { period: string; description: string }[]; // description is now HTML content
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
