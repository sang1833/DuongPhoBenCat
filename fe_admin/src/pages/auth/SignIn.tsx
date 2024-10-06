import React, { useState } from "react";
import { Contact, LockKeyhole } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "@api";

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
      response = await apiLogin({ username, password });
      const userData: UserData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
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
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
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

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Đăng nhập"
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
