import { LatLngBounds } from "leaflet";
import React from "react";
import { useMap } from "react-leaflet";
import { IStreetRoute } from "../../types";

const FlyToStreet: React.FC<{
  street: IStreetRoute | null;
  streets: IStreetRoute[];
}> = ({ street, streets }) => {
  const map = useMap();

  React.useEffect(() => {
    if (street) {
      const bounds = new LatLngBounds(street.route.coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (streets.length > 0) {
      const allPoints = streets.flatMap((s) => s.route.coordinates);
      const bounds = new LatLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [street, streets, map]);

  return null;
};

export default FlyToStreet;
