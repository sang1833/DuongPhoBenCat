import React from "react";
import { MapContainer, Polygon, Polyline, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { IStreetRoute, MapState } from "../../types";
import "leaflet/dist/leaflet.css";
import ProtomapsLayer from "./ProtomapLayer";
import FlyToStreet from "./FlyToStreet";
import boundaryData from "../../data/boundary.json";
import config from "../../data/config";

interface MapProps {
  streets: IStreetRoute[];
  selectedStreet: IStreetRoute | null;
  mapState: MapState;
  onStreetClick: (street: IStreetRoute) => void;
}

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

  const boundaryCoordinates: [number, number][] =
    boundaryData.coordinates[0].map(([lng, lat]) => [lat, lng]);

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
          positions={street.route.coordinates}
          color={config.street.color}
          eventHandlers={{
            click: () => onStreetClick(street)
          }}
        >
          <Popup>{street.streetName}</Popup>
        </Polyline>
      ))}
      <FlyToStreet street={selectedStreet} streets={streets} />
      <Polygon
        positions={boundaryCoordinates}
        pathOptions={{
          color: config.boundary.color,
          weight: config.boundary.width,
          fillOpacity: 0
        }}
      />
    </MapContainer>
  );
};

export default Map;
