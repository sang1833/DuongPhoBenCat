import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { ProtomapsLayerProps } from "../../types";

const ProtomapsLayer: React.FC<ProtomapsLayerProps> = ({ theme }) => {
  const map = useMap();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layer = (window as any).protomapsL.leafletLayer({
      url: "/BinhDuong.pmtiles",
      theme: theme
    });
    layer.addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, theme]);

  return null;
};

export default ProtomapsLayer;
