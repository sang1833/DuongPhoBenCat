import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const CustomAttributionControl = () => {
  const map = useMap();

  useEffect(() => {
    const CustomControl = L.Control.extend({
      onAdd: function () {
        let summary = document.querySelector(
          ".custom-attribution-control"
        ) as HTMLElement;

        const container = L.DomUtil.create(
          "div",
          "leaflet-bar leaflet-control custom-attribution-control"
        );
        if (!summary) {
          summary = L.DomUtil.create("summary", "", container);
          summary.innerHTML = "ℹ️";
        }
        const attribution = document.querySelector(
          ".leaflet-control-attribution"
        ) as HTMLElement;

        if (attribution) {
          attribution.style.display = "none";
          summary.addEventListener("click", () => {
            if (attribution.style.display === "none") {
              attribution.style.display = "block";
            } else {
              attribution.style.display = "none";
            }
          });
        }

        return container;
      }
    });

    const customControl = new CustomControl({ position: "bottomright" });
    if (customControl) map.addControl(customControl);

    return () => {
      map.removeControl(new CustomControl({ position: "bottomright" }));
    };
  }, [map]);

  return null;
};

export default CustomAttributionControl;
