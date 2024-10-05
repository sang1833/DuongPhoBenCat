import { AuthApi } from "@api";

export const RefreshToken = async () => {
  try {
    const authApi = new AuthApi();
    const res = await authApi.apiAuthRefreshTokenPost();
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
