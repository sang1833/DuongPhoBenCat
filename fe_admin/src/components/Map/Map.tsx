import React, { useState } from "react";
import { MapContainer, Marker, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import axios from "axios";
import polyline from "@mapbox/polyline";
import ProtomapsLayer from "./ProtomapLayer";
import { OutlinedNormalButton } from "@components";

// Define custom icons
const osrmIcon = L.icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue for OSRM
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const manualIcon = L.icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red for Manual
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface MapProps {
  osrmWaypoints?: L.LatLng[];
  setOsrmWaypoints: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
  osrmRoute?: L.LatLng[];
  setOsrmRoute: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
  manualWaypoints?: L.LatLng[];
  setManualWaypoints: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
  manualRoute?: L.LatLng[];
  setManualRoute: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
}

// interface L.LatLng {
//   lat: number;
//   lng: number;
// }

const MapComponent: React.FC<MapProps> = ({
  osrmWaypoints,
  setOsrmWaypoints,
  osrmRoute,
  setOsrmRoute,
  manualWaypoints,
  setManualWaypoints,
  manualRoute,
  setManualRoute
}) => {
  const defaultCenter: [number, number] = [11.1616595, 106.594514];
  const bounds: L.LatLngBoundsExpression = [
    [11.018, 106.4345], // Southwest coordinates
    [11.2336, 106.8417] // Northeast coordinates
  ];
  const position: LatLngExpression = [11.1616595, 106.594514];

  // const [osrmWaypoints, setOsrmWaypoints] = useState<L.LatLng[]>([]);
  // const [osrmRoute, setOsrmRoute] = useState<L.LatLng[]>([]);

  // const [manualWaypoints, setManualWaypoints] = useState<L.LatLng[]>([]);
  // const [manualRoute, setManualRoute] = useState<L.LatLng[]>([]);

  const [useOsrm, setUseOsrm] = useState<boolean>(true);

  // Add a waypoint
  const addWaypoint = (latlng: L.LatLng) => {
    if (useOsrm) {
      setOsrmWaypoints((prev) => (prev ? [...prev, latlng] : [latlng]));
      calculateOsrmRoute(osrmWaypoints ? [...osrmWaypoints, latlng] : [latlng]);
    } else {
      setManualWaypoints((prev) => (prev ? [...prev, latlng] : [latlng]));
      setManualRoute((prev) => (prev ? [...prev, latlng] : [latlng]));
    }
  };

  // Update waypoint position
  const updateWaypoint = (index: number, newLatLng: L.LatLng) => {
    if (useOsrm) {
      const updatedWaypoints = [...(osrmWaypoints || [])];
      updatedWaypoints[index] = newLatLng;
      setOsrmWaypoints(updatedWaypoints);
      calculateOsrmRoute(updatedWaypoints);
    } else {
      const updatedWaypoints = [...(manualWaypoints || [])];
      updatedWaypoints[index] = newLatLng;
      setManualWaypoints(updatedWaypoints);
      setManualRoute(updatedWaypoints);
    }
  };

  // Remove a waypoint
  const removeWaypoint = (
    index: number,
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) e.preventDefault();

    if (useOsrm) {
      const updatedWaypoints = osrmWaypoints?.filter((_, i) => i !== index);
      setOsrmWaypoints(updatedWaypoints || []);
      if (updatedWaypoints?.length === 0) {
        setOsrmRoute([]);
      } else {
        calculateOsrmRoute(updatedWaypoints || []);
      }
    } else {
      const updatedWaypoints = manualWaypoints?.filter((_, i) => i !== index);
      setManualWaypoints(updatedWaypoints || []);
      setManualRoute(updatedWaypoints || []);
    }
  };

  // Fetch route from OSRM
  const calculateOsrmRoute = async (waypoints: L.LatLng[]) => {
    if (waypoints.length < 2) return;

    const coords = waypoints.map((p) => `${p.lng},${p.lat}`).join(";");
    const url = `${
      import.meta.env.VITE_OSRM_URL
    }/driving/${coords}?overview=full`;

    try {
      const response = await axios.get(url);

      if (response.data.code === "Ok") {
        const decodedRoute = polyline
          .decode(response.data.routes[0].geometry)
          .map(([lat, lng]: [number, number]) => ({ lat, lng }));
        setOsrmRoute(decodedRoute as L.LatLng[]);
      } else {
        console.error("Error: Invalid OSRM response");
      }
    } catch (error) {
      console.error("Error fetching route from OSRM:", error);
    }
  };

  // Toggle active waypoint management mode
  const toggleMode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setUseOsrm((prev) => !prev);
  };

  // Map click event to add waypoints
  const MapEvents: React.FC = () => {
    useMapEvents({
      click(e) {
        addWaypoint(new L.LatLng(e.latlng.lat, e.latlng.lng));
      }
    });
    return null;
  };

  return (
    <div className="flex">
      {/* Sidebar to display waypoints and remove buttons */}
      <div className="w-[220px] h-[80vh] p-8 bg-white overflow-y-scroll">
        <h4 className="font-bold">Tự định tuyến</h4>
        <ul className="list-none p-0">
          {osrmWaypoints &&
            osrmWaypoints.map((waypoint, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-5"
              >
                <span>
                  Lat: {waypoint.lat.toFixed(5)}, Lng: {waypoint.lng.toFixed(5)}
                </span>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                  onClick={(e) => removeWaypoint(index, e)}
                >
                  X
                </button>
              </li>
            ))}
        </ul>
        <h4 className="font-bold">Thủ công</h4>
        <ul className="list-none p-0">
          {manualWaypoints &&
            manualWaypoints.map((waypoint, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-5"
              >
                <span>
                  Lat: {waypoint.lat.toFixed(5)}, Lng: {waypoint.lng.toFixed(5)}
                </span>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                  onClick={(e) => removeWaypoint(index, e)}
                >
                  X
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Map container */}
      <div className="flex-1">
        <OutlinedNormalButton
          onClick={(e) => toggleMode(e)}
          className="mb-1 ml-1"
        >
          {useOsrm ? "Định tuyến tự động" : "Thủ công"}
        </OutlinedNormalButton>
        <MapContainer
          center={position || defaultCenter}
          zoom={13}
          minZoom={12}
          style={{ height: "80vh", width: "100%" }}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
        >
          {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
          <ProtomapsLayer theme="light" />
          <MapEvents />
          {/* Render OSRM Waypoints and Route */}
          {osrmWaypoints &&
            osrmWaypoints.map((point, index) => (
              <Marker
                key={`osrm-${index}`}
                position={[point.lat, point.lng] as LatLngExpression}
                icon={osrmIcon}
                draggable={useOsrm}
                eventHandlers={{
                  dragend: (e) => {
                    if (!useOsrm) return;
                    const marker = e.target as L.Marker;
                    const newLatLng = marker.getLatLng();
                    updateWaypoint(
                      index,
                      L.latLng(newLatLng.lat, newLatLng.lng)
                    );
                  },
                  click: () => removeWaypoint(index)
                }}
              />
            ))}
          {osrmRoute && osrmRoute.length > 0 && (
            <Polyline
              positions={osrmRoute as LatLngExpression[]}
              color="blue"
              weight={5}
              opacity={0.8}
            />
          )}
          {/* Render Manual Waypoints and Route */}
          {manualWaypoints &&
            manualWaypoints.map((point, index) => (
              <Marker
                key={`manual-${index}`}
                position={[point.lat, point.lng] as LatLngExpression}
                icon={manualIcon}
                draggable={!useOsrm}
                eventHandlers={{
                  dragend: (e) => {
                    if (useOsrm) return;
                    const marker = e.target as L.Marker;
                    const newLatLng = marker.getLatLng();
                    updateWaypoint(
                      index,
                      L.latLng(newLatLng.lat, newLatLng.lng)
                    );
                  },
                  click: () => removeWaypoint(index)
                }}
              />
            ))}
          {manualRoute && manualRoute.length > 1 && (
            <Polyline
              positions={
                manualRoute?.map((p) => [p.lat, p.lng]) as LatLngExpression[]
              }
              color="red"
              weight={3}
              opacity={0.6}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
