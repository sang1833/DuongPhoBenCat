export type IMapContext = {
  type?: string;
  position?: [number, number] | null;
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  waypoints?: L.LatLng[];
  setWaypoints: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
  routePolylines?: L.LatLng[];
  setRoutePolylines: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
};
