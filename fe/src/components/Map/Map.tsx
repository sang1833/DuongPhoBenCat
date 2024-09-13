import React, { useContext, useState } from "react";
import L from "leaflet";
import { MapContainer, ZoomControl } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContext } from "@contexts";
import { Theme } from "@types";
import RouteLayer from "./RouteLayer";
import ProtomapsLayer from "./ProtomapLayer";
import CustomAttributionControl from "./CustomAttributionControl";
import LayerGroupControl from "./LayerGroupControl";

// Fix the default icon issue in Leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent: React.FC = () => {
  const { position } = useContext(MapContext);
  const defaultCenter: [number, number] = [11.1616595, 106.594514];
  const [theme, setTheme] = useState<Theme>("light"); // Add state for theme

  const bounds: L.LatLngBoundsExpression = [
    [11.018, 106.4345], // Southwest coordinates
    [11.2336, 106.8417] // Northeast coordinates
  ];

  return (
    <>
      <MapContainer
        id="map"
        center={position || defaultCenter}
        zoom={13}
        minZoom={12}
        zoomControl={false}
        style={{ height: "100vh", width: "100%" }}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}
        <ProtomapsLayer theme={theme} />
        <RouteLayer />
        <CustomAttributionControl />
        <ZoomControl position="bottomright" />
        <LayerGroupControl theme={theme} setTheme={setTheme} />
      </MapContainer>
    </>
  );
};

export default MapComponent;
