import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { changePassword } from "@api";
import { OutlinedNormalButton } from "@components";
import { Loader } from "lucide-react";
import { AxiosError } from "axios";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Mật khẩu mới và mật khẩu nhập lại không khớp");
        return;
      }

      const response = await changePassword(currentPassword, newPassword);
      if (response.status === 200) {
        toast.success("Đổi mật khẩu thành công");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          // Handle 400 error specifically
          toast.error(error.response.data.message || "Mật khẩu cũ không đúng!");
        } else {
          // Handle other errors
          toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Đổi mật khẩu</h3>
      </div>
      <form onSubmit={handleChangePassword}>
        <fieldset
          disabled={loading}
          aria-busy={loading}
          className="p-6.5 flex flex-col gap-4"
        >
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Mật khẩu cũ
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu cũ"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Mật khẩu mới
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu mới"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Nhập lại mật khẩu mới
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Nhập lại mật khẩu mới"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <button
              disabled={loading}
              type="submit"
              className="flex justify-center rounded bg-primary py-2 px-8 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Đổi mật khẩu</span>
              )}
            </button>
            <Link to="/">
              <OutlinedNormalButton>
                <span>Trở về trang chủ</span>
              </OutlinedNormalButton>
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ChangePassword;
