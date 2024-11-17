import React, { useState } from "react";
import { Contact, LockKeyhole } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "@api";

interface UserData {
  username: string;
  email: string;
  role: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let response;
    try {
      response = await login(username, password);
      if (response.status === 200) {
        const userData: UserData = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      toast.error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
      if (response?.status === 200) {
        navigate("/");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  return (
    <div className="lg:p-4 w-full h-screen flex justify-center items-center">
      <div className="border border-stroke rounded-xl bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark">
            <div className="w-full px-4 py-2 sm:px-12 sm:py-8 xl:px-16 xl:py-12">
              <h2 className="mb-2 md:mb-8 mt-4 text-center text-3xl font-bold text-black dark:text-white sm:text-title-xl2">
                Đăng nhập
              </h2>

              <form className="w-full lg:min-w-90" onSubmit={handleSubmit}>
                <fieldset
                  disabled={loading}
                  className="flex flex-col gap-5.5 p-6.5"
                >
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Tên người dùng
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Nhập tên người dùng"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4 text-body text-opacity-80">
                        <Contact />
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nhập mật khẩu
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Ít nhất 6 ký tự, có chữ hoa và số"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />

                      <span className="absolute right-4 top-4 text-body text-opacity-80">
                        <LockKeyhole />
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <input
                      type="submit"
                      value="Xác nhận"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
