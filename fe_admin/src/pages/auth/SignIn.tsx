import { Contact, LockKeyhole } from "lucide-react";
import React from "react";

const SignIn: React.FC = () => {
  return (
    <div className="lg:p-4 w-full h-screen flex justify-center items-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Đăng nhập
              </h2>

              <form className="w-full lg:min-w-90">
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Tên người dùng
                  </label>
                  <div className="relative">
                    <input
                      type="email"
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

                {/* <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  Sign in with Google
                </button> */}

                {/* <div className="mt-6 text-center">
                  <p>
                    Không có tài khoản?{" "}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
