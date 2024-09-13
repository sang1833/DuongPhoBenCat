import { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { GeoJSON } from "geojson";
import { useSelector } from "react-redux";
import { RootState } from "@types";

const RouteLayer = () => {
  const map = useMap();
  const streets = useSelector((state: RootState) => state.street);
  const [route, setRoute] = useState<L.GeoJSON | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const routeData = streets.streetLists[0]?.route;

        if (routeData && routeData.coordinates) {
          // Verify coordinates format and values
          const swappedCoordinates = routeData.coordinates.map(
            (coord: [number, number], index: number) => {
              // console.log(`Coordinate ${index}:`, coord);
              if (
                coord[1] < -180 ||
                coord[1] > 180 ||
                coord[0] < -90 ||
                coord[0] > 90
              ) {
                console.error(`Invalid coordinate at index ${index}:`, coord);
              }
              // Swap latitude and longitude
              return [coord[1], coord[0]];
            }
          );

          const geoJsonObject: GeoJSON = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: swappedCoordinates
            },
            properties: {}
          };
          const geoJsonLayer = L.geoJSON(geoJsonObject);
          setRoute(geoJsonLayer);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRoute();
  }, [streets]);

  useEffect(() => {
    route?.setStyle({
      color: "red",
      opacity: 0.7,
      weight: 8
    });
    route?.addTo(map);

    // Fly to the bounds of the route
    const bounds = route?.getBounds();
    if (bounds) map.flyToBounds(bounds);

    return () => {
      if (route) map.removeLayer(route);
    };
  }, [route, map]);

  return null;
};

export default RouteLayer;
