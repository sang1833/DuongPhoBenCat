import { adminChangeUserPassword } from "@api";
import { Input } from "@components";
import { AxiosError } from "axios";
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define the state shape
interface State {
  password: string;
  errors: Record<string, string>;
  loading: boolean;
}

// Define action types
type Action =
  | { type: "SET_FIELD"; field: keyof State; value: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "RESET_FORM" };

// Define the reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

// Initial state
const initialState: State = {
  password: "",
  errors: {},
  loading: false
};

const UserPassword = ({ userId }: { userId: string | undefined }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!state.password.trim())
      newErrors.userName = "Tên người dùng không được để trống";
    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handlePostUser = async () => {
    dispatch({ type: "SET_LOADING", loading: true });

    try {
      const response = await adminChangeUserPassword(
        userId as string,
        state.password
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Chỉnh sửa người dùng thành công");
        navigate("/user");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error("Sửa mật khẩu thất bại", error.response?.data.message);
      }
    }
    dispatch({ type: "SET_LOADING", loading: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      handlePostUser();
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <h2 className="px-4 text-xl font-semibold text-heading mt-4">Mật khẩu</h2>

      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={state.loading}
          className="flex flex-col gap-5.5 p-6.5"
        >
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full">
              <Input
                title="Mật khẩu"
                placeholder="Nhập mật khẩu"
                type="password"
                value={state.password}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "password",
                    value: e.target.value
                  })
                }
                isAutoFill={false}
                error={state.errors.password}
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              type="submit"
              className={`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-primary 
                ${state.errors.userName ? "bg-red-700" : ""}`}
            >
              {state.loading ? "Đang xử lý..." : "Đổi mật khẩu"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default UserPassword;
