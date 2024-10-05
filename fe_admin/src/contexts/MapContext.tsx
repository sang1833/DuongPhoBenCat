import { IMapContext } from "@types/index";
import { createContext, ReactNode, useState } from "react";

export const MapContext = createContext<IMapContext>({
  position: [11.1616595, 106.594514],
  setPosition: () => {},
  waypoints: [],
  setWaypoints: () => {},
  routePolylines: [],
  setRoutePolylines: () => {}
});

export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [position, setPosition] = useState<[number, number] | null>([
    11.1616595, 106.594514
  ]);
  const [waypoints, setWaypoints] = useState<L.LatLng[]>([]);
  const [routePolylines, setRoutePolylines] = useState<L.LatLng[]>([]);

  return (
    <MapContext.Provider
      value={{
        position,
        setPosition,
        waypoints,
        setWaypoints,
        routePolylines,
        setRoutePolylines
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
