import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LatLng } from "leaflet";
import { MapContext } from "@contexts";
import {
  Breadcrumb,
  Map,
  ContainedNormalButton,
  BackButton
} from "@components";
import { StreetApi, CreateStreetRequestDto } from "@api";

const StreetDetail = () => {
  const navigate = useNavigate();
  const { setPosition, waypoints, routePolylines } = useContext(MapContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, [setPosition]);

  const handlePostStreet = async () => {
    if (!waypoints || !routePolylines) {
      console.error("No waypoints or route polylines to post street");
      return;
    }

    const streetApi = new StreetApi();
    const createStreetRequestDto: CreateStreetRequestDto = {
      streetName: "Example Street",
      streetTypeId: 1,
      address: "Example Address",
      imageUrl: "https://example.com/image.jpg",
      description: "An example street",
      wayPoints: {
        coordinates: waypoints?.map((wp: LatLng) => [wp.lat, wp.lng])
      },
      route: {
        coordinates: routePolylines?.map((wp: LatLng) => [wp.lat, wp.lng])
      },
      streetImages: [
        {
          imageUrl: "https://example.com/image1.jpg",
          publicId: "publicId1",
          description: "Image 1"
        }
      ]
    };

    try {
      const response = await streetApi.apiStreetAdminCreatePost(
        createStreetRequestDto
      );
      console.log("Street created successfully:", response);
    } catch (error) {
      console.error("Error creating street:", error);
    }
  };

  return (
    <section className="relative">
      <BackButton onClick={() => navigate(-1)} />
      <Breadcrumb pageName="Chi tiết tuyến đường" />
      <Map />
      <ContainedNormalButton color="primary" onClick={handlePostStreet}>
        Test
      </ContainedNormalButton>
    </section>
  );
};

export default StreetDetail;
