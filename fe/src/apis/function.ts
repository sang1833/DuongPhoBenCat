import { api } from "./config";

export const getStreets = async (address: string) => {
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

export const userGetDetail = async (streetId: number) => {
  const response = await api.get("/api/street/userGetDetail", {
    params: {
      streetId: streetId
    }
  });
  return response.data;
};
