import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LatLng } from "leaflet";
import { useTranslation } from "react-i18next";
import {
  BackButton,
  Breadcrumb,
  Input,
  Map,
  OutlinedNormalButton,
  SelectGroupOne,
  StreetImage,
  TextArea
} from "@components";
import {
  IStreet,
  IStreetImage,
  IStreetType,
  IStreetTypeList,
  IStreetTypeoption
} from "@types";
import { MapContext } from "@contexts";
import {
  adminGetStreetById,
  adminGetStreetTypes,
  adminUpdateStreet,
  UpdateStreetRequestDto
} from "@api";
import { toast } from "react-toastify";

interface ErrorMessages {
  streetName?: string;
  streetAddress?: string;
  streetWaypoint?: string;
}

const options: IStreetTypeoption[] = [
  {
    value: 1,
    label: "Đường lớn"
  },
  {
    value: 2,
    label: "Đường hẻm"
  },
  {
    value: 3,
    label: "Ngõ nhỏ"
  }
];

const ChangeStreetPage: React.FC = () => {
  const { t } = useTranslation();
  const { streetId } = useParams();
  const navigate = useNavigate();
  const { waypoints, routePolylines, setWaypoints } = useContext(MapContext);

  const [streetName, setStreetName] = useState<string>("");
  const [streetTypeId, setStreetTypeId] = useState<number>(1);
  const [streetTypes, setStreetTypes] = useState<IStreetTypeoption[]>(options);
  const [isSTypeSelected, setIsSTypeSelected] = useState<boolean>(false);
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [streetDescription, setStreetDescription] = useState<string>("");
  const [streetImages, setStreetImages] = useState<IStreetImage[]>([]);
  const [errors, setErrors] = useState<ErrorMessages>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStreets = async () => {
      try {
        const _streetId = parseInt(streetId?.toString() || "");
        const response = await adminGetStreetById(_streetId);

        const streetData = response.data as unknown as IStreet;
        setWaypoints(
          streetData.wayPoints.coordinates.map(
            (coord: [number, number]) => new LatLng(coord[0], coord[1])
          )
        );
        setStreetName(streetData.streetName);
        setStreetTypeId(streetData.streetTypeId);
        setStreetAddress(streetData.address);
        setStreetDescription(streetData.description);
        setStreetImages(
          streetData.images.map((image: IStreetImage) => ({
            imageUrl: image.imageUrl,
            publicId: image.publicId,
            description: image.description
          }))
        );
      } catch (error) {
        console.error("Error fetching streets:", error);
      }
    };

    fetchStreets();
  }, [setWaypoints, streetId]);

  useEffect(() => {
    const fetchStreetTypes = async () => {
      try {
        const response = await adminGetStreetTypes();
        const data: IStreetType[] =
          (response.data as unknown as IStreetTypeList)?.streetTypes || [];

        if (Array.isArray(data)) {
          setStreetTypes(
            data.map((type) => {
              return {
                value: type.id,
                label: type.streetTypeName
              };
            })
          );
        }
      } catch (error) {
        console.error("Error fetching street types:", error);
      }
    };

    fetchStreetTypes();
  }, []);

  const validateForm = () => {
    const newErrors: ErrorMessages = {};
    if (!streetName.trim()) newErrors.streetName = "Phải có tên đường";
    if (!streetAddress.trim())
      newErrors.streetAddress = "Phải có địa chỉ đường";
    setErrors(newErrors);
    if (
      (waypoints as LatLng[]).length < 2 ||
      (routePolylines as LatLng[])?.length < 2
    )
      newErrors.streetWaypoint = "Phải có toạ độ tuyến đường";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePutStreet = async () => {
    setLoading(true);
    try {
      if (!waypoints || !routePolylines) {
        console.error("No waypoints or route polylines to post street");
        return;
      }

      const updateStreetRequestDto: UpdateStreetRequestDto = {
        streetName: streetName,
        streetTypeId: streetTypeId,
        address: streetAddress,
        imageUrl: "",
        description: streetDescription,
        wayPoints: {
          coordinates: waypoints?.map((wp: LatLng) => [wp.lat, wp.lng])
        },
        route: {
          coordinates: routePolylines?.map((wp: LatLng) => [wp.lat, wp.lng])
        },
        streetImages: streetImages.map((image) => ({
          imageUrl: image.imageUrl || "",
          publicId: image.publicId || "",
          description: image.description || ""
        }))
      };

      const response = await adminUpdateStreet(
        parseInt(streetId || ""),
        updateStreetRequestDto
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
        navigate("/map/street");
      }
    } catch (error) {
      console.error("Error creating street:", error);
      toast.error("Cập nhật tuyến đường thất bại");
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
      handlePutStreet();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton onClick={() => navigate(-1)} />
      <Breadcrumb pageName="Tạo tuyến đường" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} className="flex flex-col gap-5.5 p-6.5">
            <div className="flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <Input
                  title="Tên đường"
                  placeholder="Nhập tên đường"
                  type="text"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  required
                  error={errors.streetName}
                />
              </div>
              <div className="w-full xl:w-1/2">
                <SelectGroupOne
                  title="Loại đường"
                  selectedOption={streetTypeId}
                  setSelectedOption={setStreetTypeId}
                  isOptionSelected={isSTypeSelected}
                  setIsOptionSelected={setIsSTypeSelected}
                  options={streetTypes}
                />
              </div>
            </div>

            <div>
              <Input
                title="Địa chỉ"
                placeholder="Nhập địa chỉ"
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
                error={errors.streetAddress}
              />
            </div>

            <div>
              <TextArea
                title="Mô tả"
                placeholder="Nhập mô tả"
                rows={6}
                value={streetDescription}
                onChange={(e) => setStreetDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tuyến đường <span className="text-meta-1">*</span>
              </label>
              <Map />
              {errors.streetWaypoint && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.streetWaypoint}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                {t("Click on the map to add markers and create a route.")}
              </p>
            </div>

            <StreetImage
              streetImages={streetImages}
              setStreetImages={setStreetImages}
            />

            <div className="flex justify-center items-center gap-4">
              <button
                type="submit"
                className={`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-primary 
                ${
                  errors.streetAddress || errors.streetName ? "bg-red-700" : ""
                }`}
              >
                {t("ok")}
              </button>
              <OutlinedNormalButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  navigate(-1);
                }}
                className="text-red-600"
              >
                {t("cancel")}
              </OutlinedNormalButton>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ChangeStreetPage;
