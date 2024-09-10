import { useEffect } from "react";
import { useMap } from "react-leaflet";

const ProtomapsLayer: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layer = (window as any).protomapsL.leafletLayer({
      url: "/BinhDuong.pmtiles",
      theme: "light"
    });
    layer.addTo(map);
  }, [map]);

  return null;
};

export default ProtomapsLayer;
