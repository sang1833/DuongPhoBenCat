import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BackButton,
  Breadcrumb,
  Input,
  OutlinedNormalButton
} from "@components";
import { getUserById, adminChangeUser } from "@api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import UserPassword from "./UserPassword";

const userRoles = [
  { value: "SupAdmin", label: "SupAdmin" },
  { value: "Admin", label: "Admin" },
  { value: "Collab", label: "Collab" },
  { value: "Director", label: "Director" }
];

// Define the state shape
interface State {
  userName: string;
  email: string;
  role: string;
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
  userName: "",
  email: "",
  role: "",
  errors: {},
  loading: false
};

const ChangeUserPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!state.userName.trim())
      newErrors.userName = "Tên người dùng không được để trống";
    if (!state.email.trim()) newErrors.email = "Email không được để trống";
    if (!state.role.trim()) newErrors.role = "Vai trò không được để trống";
    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const handleGetUser = async () => {
      const response = await getUserById(userId as string);
      if (response.status === 200) {
        dispatch({
          type: "SET_FIELD",
          field: "userName",
          value: response.data.userName
        });
        dispatch({
          type: "SET_FIELD",
          field: "email",
          value: response.data.email
        });
        dispatch({
          type: "SET_FIELD",
          field: "role",
          value: response.data.roles[0]
        });
      }
    };

    handleGetUser();
  }, [userId]);

  const handlePostUser = async () => {
    dispatch({ type: "SET_LOADING", loading: true });

    try {
      const response = await adminChangeUser(userId as string, {
        username: state.userName,
        email: state.email,
        role: state.role
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Chỉnh sửa người dùng thành công");
        navigate("/user");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          "Chỉnh sửa người dùng thất bại",
          error.response?.data.message
        );
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
    <div className="container mx-auto px-4 py-8">
      <BackButton onClick={() => navigate(-1)} />
      <Breadcrumb pageName="Chỉnh sửa người dùng" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h2 className="px-4 text-xl font-semibold text-heading mt-4">
          Thông tin cá nhân
        </h2>
        <form onSubmit={handleSubmit}>
          <fieldset
            disabled={state.loading}
            className="flex flex-col gap-5.5 p-6.5"
          >
            <div className="flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <Input
                  title="Tên người dùng"
                  placeholder="Nhập tên người dùng"
                  type="text"
                  value={state.userName}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "userName",
                      value: e.target.value
                    })
                  }
                  error={state.errors.userName}
                  isAutoFill={false}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <Input
                  title="Email"
                  placeholder="Nhập email"
                  type="email"
                  value={state.email}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "email",
                      value: e.target.value
                    })
                  }
                  error={state.errors.email}
                  isAutoFill={false}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                  Vai trò <span className="text-meta-1">*</span>
                </label>

                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    id="role"
                    disabled={false}
                    value={state.role}
                    defaultValue={state.role}
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch({
                        type: "SET_FIELD",
                        field: "role",
                        value: value
                      });
                    }}
                    className={
                      `relative z-20 w-full appearance-none rounded-lg border border-gray-700 bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        state.role ? "text-black dark:text-white" : ""
                      }` + `${state.errors.role ? "border-red-500" : ""}`
                    }
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      Chọn 1 lựa chọn
                    </option>
                    {userRoles.map((option, index) => (
                      <option
                        key={index}
                        value={option.value}
                        selected={option.value === state.role}
                        className="text-black dark:text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                type="submit"
                className={`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-primary 
                ${state.errors.userName ? "bg-red-700" : ""}`}
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

      <UserPassword userId={userId} />
    </div>
  );
};

export default ChangeUserPage;
