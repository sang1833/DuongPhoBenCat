import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BackButton, Breadcrumb, Input } from "@components";
import { MapContext } from "@contexts";
import { StreetTypeApi, UpdateStreetTypeRequestDto } from "@api";
import { IStreetType } from "@types";
import { toast } from "react-toastify";

interface ErrorMessages {
  streetTypeName?: string;
}

const ChangeStreetTypePage: React.FC = () => {
  const { t } = useTranslation();
  const { streetTypeId } = useParams();
  const navigate = useNavigate();
  const { waypoints, routePolylines } = useContext(MapContext);

  const [streetTypeName, setStreetTypeName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorMessages>({});

  useEffect(() => {
    async function fetchStreetType() {
      try {
        const streetTypeApi = new StreetTypeApi();
        const _streetTypeId = parseInt(streetTypeId as string);
        const response = await streetTypeApi.apiStreetTypeIdGet(_streetTypeId);
        setStreetTypeName(
          (response.data as unknown as IStreetType).streetTypeName
        );
      } catch (error) {
        console.error("Error fetching street type:", error);
      }
    }

    fetchStreetType();
  }, [streetTypeId]);

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

    const streettypeApi = new StreetTypeApi();
    const updateStreetTypeRequestDto: UpdateStreetTypeRequestDto = {
      streetTypeName: streetTypeName
    };

    try {
      const response = await streettypeApi.apiStreetTypeIdPut(
        parseInt(streetTypeId as string),
        updateStreetTypeRequestDto
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
        navigate("/map/street-type");
      }
    } catch (error) {
      toast.error("Cập nhật loại tuyến đường thất bại");
      console.error("Error creating street:", error);
    } finally {
      setLoading(false);
    }
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
      <Breadcrumb pageName="Sửa loại tuyến đường" />
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

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-primary 
                ${errors.streetTypeName ? "bg-red-700" : ""}`}
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

export default ChangeStreetTypePage;