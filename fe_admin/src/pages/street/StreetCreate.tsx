import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LatLng } from "leaflet";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  BackButton,
  Breadcrumb,
  Input,
  Map,
  OutlinedNormalButton,
  StreetImage,
  TextArea,
  StreetHistory,
  SelectGroupOne
} from "@components";
import {
  IStreetHistory,
  IStreetImage,
  IStreetType,
  IStreetTypeList,
  ISelectOption
} from "@types";
import {
  CreateStreetRequestDto,
  adminCreateStreet,
  adminGetStreetTypes
} from "@api";
import { towns } from "../../data/towns";

interface ErrorMessages {
  streetName?: string;
  streetAddress?: string;
  streetWaypoint?: string;
}

const options: ISelectOption[] = [
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

const addressOptions: ISelectOption[] = [
  {
    value: " ",
    label: "Không có địa chỉ"
  },
  ...towns.map((town) => ({
    value: town,
    label: town
  }))
];

const PostStreetPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [osrmWaypoints, setOsrmWaypoints] = useState<L.LatLng[]>([]);
  const [osrmRoute, setOsrmRoute] = useState<L.LatLng[]>([]);

  const [manualWaypoints, setManualWaypoints] = useState<L.LatLng[]>([]);
  const [manualRoute, setManualRoute] = useState<L.LatLng[]>([]);

  const [streetName, setStreetName] = useState<string>("");
  const [streetTypeId, setStreetTypeId] = useState<number | string>(1);
  const [streetTypes, setStreetTypes] = useState<ISelectOption[]>(options);
  const [isSTypeSelected, setIsSTypeSelected] = useState<boolean>(false);
  const [streetAddress, setStreetAddress] = useState<string | number>("");
  const [isAddressSelected, setIsAddressSelected] = useState<boolean>(false);
  const [streetDescription, setStreetDescription] = useState<string>("");
  const [streetImages, setStreetImages] = useState<IStreetImage[]>([]);
  const [histories, setHistories] = useState<IStreetHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorMessages>({});

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
    setErrors(newErrors);
    if (
      (osrmWaypoints as LatLng[]).length < 2 ||
      (osrmRoute as LatLng[])?.length < 2
    )
      newErrors.streetWaypoint = "Phải có toạ độ tuyến đường";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostStreet = async () => {
    setLoading(true);

    try {
      if (!osrmWaypoints || !osrmRoute) {
        console.error("No waypoints or route polylines to post street");
        setLoading(false);
        return;
      }

      const createStreetRequestDto: CreateStreetRequestDto = {
        streetName: streetName,
        streetTypeId: streetTypeId as number,
        address: streetAddress as string,
        imageUrl: "",
        description: streetDescription,
        wayPoints: {
          coordinates: osrmWaypoints?.map((wp: LatLng) => [wp.lat, wp.lng])
        },
        route: {
          coordinates: osrmRoute?.map((wp: LatLng) => [wp.lat, wp.lng])
        },
        images: streetImages.map((image) => ({
          imageUrl: image.imageUrl || "",
          publicId: image.publicId || "",
          description: image.description || ""
        })),
        histories: histories.map((history) => ({
          period: history.period,
          description: history.description
        }))
      };

      const response = await adminCreateStreet(createStreetRequestDto);
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        <form>
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
                  placeholder="Chọn loại đường"
                  selectedOption={streetTypeId}
                  setSelectedOption={(value: number | string) =>
                    setStreetTypeId(value)
                  }
                  isOptionSelected={isSTypeSelected}
                  setIsOptionSelected={setIsSTypeSelected}
                  options={streetTypes}
                />
              </div>
            </div>

            <div>
              {/* <Input
                title="Địa chỉ"
                placeholder="Nhập địa chỉ"
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                error={errors.streetAddress}
              /> */}
              <SelectGroupOne
                title="Địa chỉ"
                placeholder="Chọn địa chỉ"
                selectedOption={streetAddress}
                setSelectedOption={setStreetAddress}
                isOptionSelected={isAddressSelected}
                setIsOptionSelected={setIsAddressSelected}
                options={addressOptions}
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
              <Map
                osrmWaypoints={osrmWaypoints}
                setOsrmWaypoints={setOsrmWaypoints}
                osrmRoute={osrmRoute}
                setOsrmRoute={setOsrmRoute}
                manualWaypoints={manualWaypoints}
                setManualWaypoints={setManualWaypoints}
                manualRoute={manualRoute}
                setManualRoute={setManualRoute}
              />
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

            <>
              <label className="block text-sm font-medium text-gray-700">
                Lịch sử
              </label>
              <StreetHistory
                histories={histories}
                setHistories={setHistories}
              />
            </>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handleSubmit}
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

export default PostStreetPage;
