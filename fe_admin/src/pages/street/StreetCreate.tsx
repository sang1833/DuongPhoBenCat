import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LatLng } from "leaflet";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  BackButton,
  Breadcrumb,
  Input,
  Map,
  SelectGroupOne,
  StreetImage,
  TextArea
} from "@components";
import {
  IStreetImage,
  IStreetType,
  IStreetTypeList,
  IStreetTypeoption
} from "@types";
import { MapContext } from "@contexts";
import { CreateStreetRequestDto, StreetApi, StreetTypeApi } from "@api";

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

const PostStreetPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { waypoints, routePolylines } = useContext(MapContext);

  const [streetName, setStreetName] = useState<string>("");
  const [streetTypeId, setStreetTypeId] = useState<number>(1);
  const [streetTypes, setStreetTypes] = useState<IStreetTypeoption[]>(options);
  const [isSTypeSelected, setIsSTypeSelected] = useState<boolean>(false);
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [streetDescription, setStreetDescription] = useState<string>("");
  const [streetImages, setStreetImages] = useState<IStreetImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorMessages>({});

  useEffect(() => {
    const fetchStreetTypes = async () => {
      const streetTypeApi = new StreetTypeApi();
      try {
        const response = await streetTypeApi.apiStreetTypeGet();
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

  const handlePostStreet = async () => {
    setLoading(true);

    try {
      if (!waypoints || !routePolylines) {
        console.error("No waypoints or route polylines to post street");
        return;
      }

      const streetApi = new StreetApi();
      const createStreetRequestDto: CreateStreetRequestDto = {
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

      const response = await streetApi.apiStreetAdminCreatePost(
        createStreetRequestDto
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Tạo thành công");
        navigate("/map/street");
      }
    } catch (error) {
      toast.error("Tạo tuyến đường thất bại");
      console.error("Error creating street:", error);
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
      handlePostStreet();
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

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-primary 
                ${
                  errors.streetAddress || errors.streetName ? "bg-red-700" : ""
                }`}
              >
                {t("ok")}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PostStreetPage;
