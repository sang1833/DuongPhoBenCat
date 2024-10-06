import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BackButton,
  Breadcrumb,
  Input,
  OutlinedNormalButton
} from "@components";
import { MapContext } from "@contexts";
import { adminCreateStreetType, CreateStreetTypeRequestDto } from "@api";
import { toast } from "react-toastify";

interface ErrorMessages {
  streetTypeName?: string;
}

const PostStreetTypePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { waypoints, routePolylines } = useContext(MapContext);

  const [streetTypeName, setStreetTypeName] = useState<string>("");
  const [errors, setErrors] = useState<ErrorMessages>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: ErrorMessages = {};
    if (!streetTypeName.trim())
      newErrors.streetTypeName = "Phải có tên loại đường";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostStreet = async () => {
    setLoading(true);
    if (!waypoints || !routePolylines) {
      console.error("No waypoints or route polylines to post street");
      return;
    }

    const createStreetTypeRequestDto: CreateStreetTypeRequestDto = {
      streetTypeName: streetTypeName
    };

    try {
      const response = await adminCreateStreetType(createStreetTypeRequestDto);
      if (response.status === 200) {
        toast.success("Tạo thành công");
        navigate("/map/street-type");
      }
    } catch (error) {
      toast.error("Tạo loại tuyến đường thất bại");
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
      <Breadcrumb pageName="Tạo loại tuyến đường" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} className="flex flex-col gap-5.5 p-6.5">
            <div className="flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <Input
                  title="Tên loại đường"
                  placeholder="Nhập tên loại đường"
                  type="text"
                  value={streetTypeName}
                  onChange={(e) => setStreetTypeName(e.target.value)}
                  required
                  error={errors.streetTypeName}
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                type="submit"
                className={`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-primary 
                ${errors.streetTypeName ? "bg-red-700" : ""}`}
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

export default PostStreetTypePage;
