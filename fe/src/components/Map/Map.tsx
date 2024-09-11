import React, { useContext, useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, ZoomControl } from "react-leaflet";
import { GeoJSON } from "geojson";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContext } from "@contexts";
import { StreetApi } from "@api";
import { CustomRespone, Theme } from "@types";
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
  // const isAlterAttributionControl = useRef(false);
  const { position } = useContext(MapContext);
  const defaultCenter: [number, number] = [11.1616595, 106.594514];
  const [route, setRoute] = useState<L.GeoJSON | null>(null);
  const [theme, setTheme] = useState<Theme>("light"); // Add state for theme

  const bounds: L.LatLngBoundsExpression = [
    [11.018, 106.4345], // Southwest coordinates
    [11.2336, 106.8417] // Northeast coordinates
  ];

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const api = new StreetApi();
        const response = await api.apiStreetIdGet(6);
        const routeData = (response as unknown as CustomRespone)?.data?.route;

        console.log("routeData.coordinates: ", routeData.coordinates);
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
          console.log("geoJsonLayer", geoJsonLayer);
          setRoute(geoJsonLayer);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRoute();
  }, []);

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
        {route && <RouteLayer route={route} />}
        <CustomAttributionControl />
        <ZoomControl position="bottomright" />
        <LayerGroupControl theme={theme} setTheme={setTheme} />
      </MapContainer>
    </>
  );
};

export default MapComponent;
