import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ContainedNormalButton, UnderlineText } from "@components";

const InterceptPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const interceptedLink = location.state?.interceptedLink;

  return (
    <section className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex flex-col gap-4 text-center justify-center items-center">
        <h1 className="font-bold text-2xl mb-4 text-red-600">Chú ý!</h1>
        <p className="font-semibold text-xl mb-4">
          Liên kết bạn sắp chuyển đến không được quản lý bởi website Đường phố
          Bến Cát
        </p>
        {interceptedLink && (
          <ContainedNormalButton
            onClick={() => navigate(-1)}
            className="max-w-fit"
            color="primary"
          >
            {"Quay lại bản đồ"}
          </ContainedNormalButton>
        )}
        <UnderlineText
          onClick={() => (window.location.href = interceptedLink)}
          className="hover:cursor-pointer font-normal text-graydark"
        >
          {"Tôi hiểu và muốn tiếp tục >>"}
        </UnderlineText>
      </div>
    </section>
  );
};

export default InterceptPage;
