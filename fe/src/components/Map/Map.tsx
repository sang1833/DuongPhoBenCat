import React from "react";
import { MapContainer, Polyline, Popup, useMap } from "react-leaflet";
import { LatLngTuple, LatLngBounds } from "leaflet";
import { StreetInfo, MapState } from "../../types";
import "leaflet/dist/leaflet.css";
import ProtomapsLayer from "./ProtomapLayer";

interface MapProps {
  streets: StreetInfo[];
  selectedStreet: StreetInfo | null;
  mapState: MapState;
  onStreetClick: (street: StreetInfo) => void;
}

const FlyToStreet: React.FC<{
  street: StreetInfo | null;
  streets: StreetInfo[];
}> = ({ street, streets }) => {
  const map = useMap();

  React.useEffect(() => {
    if (street) {
      const bounds = new LatLngBounds(street.route);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (streets.length > 0) {
      const allPoints = streets.flatMap((s) => s.route);
      const bounds = new LatLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [street, streets, map]);

  return null;
};

const Map: React.FC<MapProps> = ({
  streets,
  selectedStreet,
  mapState,
  onStreetClick
}) => {
  const bounds: L.LatLngBoundsExpression = [
    [11.018, 106.4345], // Southwest coordinates
    [11.2336, 106.8417] // Northeast coordinates
  ];

  return (
    <MapContainer
      center={mapState.center as LatLngTuple}
      zoom={mapState.zoom}
      style={{ height: "100%", width: "100%" }}
      minZoom={12}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <ProtomapsLayer theme="light" />
      {streets.map((street) => (
        <Polyline
          key={street.id}
          positions={street.route}
          color={selectedStreet?.id === street.id ? "red" : "blue"}
          eventHandlers={{
            click: () => onStreetClick(street)
          }}
        >
          <Popup>{street.name}</Popup>
        </Polyline>
      ))}
      <FlyToStreet street={selectedStreet} streets={streets} />
    </MapContainer>
  );
};

export default Map;
