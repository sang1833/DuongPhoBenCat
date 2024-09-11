export type IMapContext = {
  type?: string;
  position?: [number, number] | null;
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  waypoints?: L.LatLng[];
  setWaypoints: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
  routePolylines?: L.LatLng[];
  setRoutePolylines: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
};

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
