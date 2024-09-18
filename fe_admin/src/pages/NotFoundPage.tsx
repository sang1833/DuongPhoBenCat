import { MapPin, StepBack } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <MapPin className="w-10 h-10 text-gray-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Không tìm thấy trang</p>
        <div className="flex flex-col space-y-4">
          <button
            className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => navigate(-1)}
          >
            <StepBack className="mr-2" />
            Quay lại
          </button>

          <Link
            to={"/"}
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            Về trang chủ
          </Link>
        </div>
        {/* <div className="mt-8 text-sm text-gray-500">
          <p>
            Need help? Visit our{" "}
            <a href="/support" className="text-blue-500 hover:text-blue-600">
              support page
            </a>
            .
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default NotFoundPage;
