import { UserData } from "@types/user";
import { reApi } from "./config";

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
  const user = localStorage.getItem("user");
  const TOKEN = user ? JSON.parse(user) : "";

  const PUBLIC_ROUTES = ["login", "forgot-password", "register"];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  if (!TOKEN && !TOKEN.token && !isPublicPage) {
    window.location.href = "/login";
    return;
  } else {
    reApi.defaults.headers.common["Authorization"] = `Bearer ${TOKEN.token}`;
    // axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN.token}`;

    reApi.interceptors.request.use(
      function (config) {
        // UPDATE: Add this code to show global loading indicator
        document.body.classList.add("loading-indicator");
        return config;
      },
      async function (error) {
        // handle refresh token
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await reApi.post("/api/auth/refreshToken", {
              refreshToken: TOKEN?.refreshToken,
              token: TOKEN?.token
            });
            if (response.status === 200) {
              console.log("Refresh token success", response.data);
              console.log("Refresh token success user", response.data.user);
              const userInfo: UserData = response.data.user;
              localStorage.setItem("user", JSON.stringify(userInfo));
              window.location.reload();
              return reApi(originalRequest);
            } else {
              window.location.href = "/login";
              return Promise.reject(error);
            }
          } catch (refreshError) {
            console.log(refreshError);
            window.location.href = "/login";
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    reApi.interceptors.response.use(
      function (response) {
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove("loading-indicator");
        return response;
      },
      function (error) {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
      }
    );
    return TOKEN;
  }
};

export default checkAuth;
