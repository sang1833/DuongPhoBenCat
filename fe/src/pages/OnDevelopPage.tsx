import { Construction } from "lucide-react";
import { Link } from "react-router-dom";

const OnDevelopPage = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex flex-col gap-4 text-center justify-center items-center">
        <Construction className="w-16 h-16 text-primary" />
        <h1 className="font-bold text-2xl mb-4 text-primary">
          Phần này đang trong quá trình phát triển
        </h1>
        <p className="text-lg mb-4 text-tailwind">
          Vui lòng quay lại bản đồ để tiếp tục sử dụng. Xin lỗi bạn vì sự bất
          tiện này!
        </p>
        <button className="inline-flex items-center justify-center rounded-md bg-blue-800 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90  lg:px-4 xl:px-6">
          <Link to="/" className="w-full">
            Quay lại bản đồ
          </Link>
        </button>
      </div>
    </section>
  );
};

export default OnDevelopPage;
