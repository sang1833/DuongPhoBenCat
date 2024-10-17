import { api } from "./config";

export const getStreetRoutes = async (address: string) => {
  const response = await api.get("/api/street/getStreetListByAddress", {
    params: {
      address: address
    }
  });
  return response.data;
};

export const userSearch = async (searchParam: string, address: string) => {
  const response = await api.get("/api/street/userSearch", {
    params: {
      searchParam: searchParam,
      address: address
    }
  });
  return response.data;
};

export const getStreetDetail = async (streetId: number) => {
  const response = await api.get(`/api/street/userGetDetail/${streetId}`);
  return response.data;
};
