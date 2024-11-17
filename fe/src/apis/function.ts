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

export const trackUserAccess = async (
  ip: string,
  hostname: string,
  city: string,
  region: string,
  country: string,
  loc: string,
  org: string,
  postal: string,
  timezone: string
) => {
  const response = await api.post("/api/track", {
    ip: ip,
    hostname: hostname,
    city: city,
    region: region,
    country: country,
    loc: loc,
    org: org,
    postal: postal,
    timezone: timezone
  });
  return response.data;
};
