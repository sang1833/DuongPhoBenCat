import { useContext, useEffect } from "react";
import { LatLng } from "leaflet";
import { Breadcrumb, Map, ContainedNormalButton } from "@components";
import { MapContext } from "@contexts";
import { StreetApi, CreateStreetRequestDto } from "@api";

const Street = () => {
  const { setPosition, waypoints, routePolylines } = useContext(MapContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const handlePostStreet = async () => {
    if (!waypoints || !routePolylines) {
      console.error("No waypoints or route polylines to post street");
      return;
    }

    const streetApi = new StreetApi();
    const createStreetRequestDto: CreateStreetRequestDto = {
      streetName: "Example Street",
      streetType: "Residential",
      description: "An example street",
      wayPoints: {
        coordinates: waypoints?.map((wp: LatLng) => [wp.lat, wp.lng])
      },
      route: {
        coordinates: routePolylines?.map((wp: LatLng) => [wp.lat, wp.lng])
      }
    };

    try {
      const response = await streetApi.apiStreetPost(createStreetRequestDto);
      console.log("Street created successfully:", response);
    } catch (error) {
      console.error("Error creating street:", error);
    }
  };

  return (
    <section className="relative">
      <Breadcrumb pageName="Street" />
      <Map />
      <ContainedNormalButton color="primary" onClick={handlePostStreet}>
        Test
      </ContainedNormalButton>
    </section>
  );
};

export default Street;
