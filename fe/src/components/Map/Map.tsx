import React from "react";
import { MapContainer, Polygon, Polyline, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useSelector } from "react-redux";
import { IStreetRoute } from "../../types";
import "leaflet/dist/leaflet.css";
import ProtomapsLayer from "./ProtomapLayer";
import FlyToStreet from "./FlyToStreet";
import boundaryData from "../../data/boundary.json";
import config from "../../data/config";
import { RootState } from "../../redux/store";

interface MapProps {
  streets: IStreetRoute[];
  selectedStreet: IStreetRoute | null;
  onStreetClick: (streetId: number | null) => void;
}

const Map: React.FC<MapProps> = ({
  streets,
  selectedStreet,
  onStreetClick
}) => {
  const { center, zoom } = useSelector((state: RootState) => state.mapState);
  const bounds: L.LatLngBoundsExpression = [
    [11.018, 106.4345], // Southwest coordinates
    [11.2336, 106.8417] // Northeast coordinates
  ];

  const boundaryCoordinates: [number, number][] =
    boundaryData.coordinates[0].map(([lng, lat]) => [lat, lng]);

  return (
    <MapContainer
      center={center as LatLngTuple}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      minZoom={12}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <ProtomapsLayer theme="light" />
      {streets.map((street) => (
        <>
          <Polyline
            key={street.id}
            positions={street.route.coordinates}
            color={config.street.color}
            weight={5}
            eventHandlers={{
              click: () => onStreetClick(street.id)
            }}
          >
            <Popup>{street.streetName}</Popup>
          </Polyline>
          <Polyline
            positions={street.route.coordinates}
            color="transparent"
            weight={20} // Increase the weight for the invisible clickable area
            eventHandlers={{
              click: () => onStreetClick(street.id)
            }}
          />
        </>
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
