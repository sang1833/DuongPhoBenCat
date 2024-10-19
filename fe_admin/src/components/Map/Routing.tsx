/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import { MapContext } from "@contexts";

const Routing: React.FC = () => {
  const { waypoints, setWaypoints, setRoutePolylines } = useContext(MapContext);
  const map: L.Map = useMap();

  const areWaypointsClose = (waypoint1: L.LatLng, waypoint2: L.LatLng) => {
    return (
      Math.abs(waypoint1.lat - waypoint2.lat) < 0.0006 &&
      Math.abs(waypoint1.lng - waypoint2.lng) < 0.0006
    );
  };

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: import.meta.env.DEV
          ? import.meta.env.VITE_OSRM_DEV_URL
          : import.meta.env.VITE_OSRM_URL
      }),
      routeWhileDragging: true,
      fitSelectedRoutes: true,
      addWaypoints: true,
      lineOptions: {
        styles: [{ color: "red", opacity: 0.7, weight: 8 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10
      }
    }).addTo(map);

    routingControl.on("routesfound", (e: any) => {
      const route = e.routes[0];
      const newRoutePolyline = route.coordinates;
      setRoutePolylines(newRoutePolyline);
    });

    routingControl.on("waypointschanged", (e: any) => {
      const newWaypoints = e.waypoints?.map((wp: any) => wp.latLng) || [];
      setWaypoints(newWaypoints);
    });

    map.on("click", (e: L.LeafletMouseEvent) => {
      const newWaypoint = e.latlng;
      setWaypoints((prevWaypoints) => {
        const newWaypoints = [...prevWaypoints, newWaypoint];
        routingControl.setWaypoints(newWaypoints);
        return newWaypoints;
      });
    });

    map.on("contextmenu", (e: L.LeafletMouseEvent) => {
      const clickedLatLng = e.latlng;
      setWaypoints((prevWaypoints) => {
        const newWaypoints = prevWaypoints.filter(
          (waypoint) => !areWaypointsClose(waypoint, clickedLatLng)
        );
        routingControl.setWaypoints(newWaypoints);
        return newWaypoints;
      });
    });

    return () => {
      map.removeControl(routingControl);
      map.off("click");
      map.off("contextmenu");
    };
  }, [map, setWaypoints, setRoutePolylines, waypoints]);
  return null;
};

export default Routing;
