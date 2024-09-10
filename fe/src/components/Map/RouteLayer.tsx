import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RouteLayer: React.FC<{ route: L.GeoJSON }> = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    route.setStyle({
      color: "red",
      opacity: 0.7,
      weight: 8
    });
    route.addTo(map);

    // Fly to the bounds of the route
    const bounds = route.getBounds();
    map.flyToBounds(bounds);

    return () => {
      map.removeLayer(route);
    };
  }, [route, map]);

  return null;
};

export default RouteLayer;
