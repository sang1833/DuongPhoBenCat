import { reApi } from "./config";
import {
  CreateStreetRequestDto,
  CreateStreetTypeRequestDto,
  LoginRequestDto,
  UpdateStreetRequestDto,
  UpdateStreetTypeRequestDto
} from "./types";

// auth
export const login = async (username: string, password: string) => {
  try {
    const response = await reApi.post("/api/auth/login", {
      username,
      password
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const adminRegister = async (
  username: string,
  email: string,
  password: string,
  userType: string
) => {
  try {
    const response = await reApi.post(`/api/auth/adminRegister/${userType}`, {
      username,
      email,
      password
    });
    return response;
  } catch (error) {
    console.error("Admin register error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await reApi.post("/api/auth/logout");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await reApi.post("/api/auth/refreshToken");
    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await reApi.post("/api/auth/changePassword", {
      currentPassword,
      newPassword
    });
    return response;
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
};

export const adminChangeUser = async (
  username: string,
  email: string,
  userType: string,
  userName: string
) => {
  try {
    const response = await reApi.put(`/api/auth/adminChangeUser/${userName}`, {
      username,
      email,
      userType
    });
    return response;
  } catch (error) {
    console.error("Admin change user error:", error);
    throw error;
  }
};

// street
export const adminSearchAllStreet = async (
  StreetName?: string,
  StreetType?: string,
  SortBy?: string,
  IsDescending?: boolean,
  PageNumber?: number,
  PageSize?: number
) => {
  try {
    const response = await reApi.get(`/api/street/adminSearch`, {
      params: {
        StreetName,
        StreetType,
        SortBy,
        IsDescending,
        PageNumber,
        PageSize
      }
    });
    return response;
  } catch (error) {
    console.error("Admin search street error:", error);
    throw error;
  }
};

export const adminGetStreetById = async (streetId: number) => {
  try {
    const response = await reApi.get(`/api/street/${streetId}`);
    return response;
  } catch (error) {
    console.error("Admin get street error:", error);
    throw error;
  }
};

export const adminCreateStreet = async (street: CreateStreetRequestDto) => {
  try {
    const response = await reApi.post("/api/street/create", street);
    return response;
  } catch (error) {
    console.error("Admin create street error:", error);
    throw error;
  }
};

export const adminUpdateStreet = async (
  streetId: number,
  street: UpdateStreetRequestDto
) => {
  try {
    const response = await reApi.put(`/api/street/${streetId}`, street);
    return response;
  } catch (error) {
    console.error("Admin update street error:", error);
    throw error;
  }
};

export const adminDeleteStreet = async (streetId: number) => {
  try {
    const response = await reApi.delete(`/api/street/${streetId}`);
    return response;
  } catch (error) {
    console.error("Admin delete street error:", error);
    throw error;
  }
};

export const approveStreet = async (streetId: string) => {
  try {
    const response = await reApi.put(`/api/street/approve/${streetId}`);
    return response;
  } catch (error) {
    console.error("Approve street error:", error);
    throw error;
  }
};

export const rejectStreet = async (streetId: string) => {
  try {
    const response = await reApi.put(`/api/street/reject/${streetId}`);
    return response;
  } catch (error) {
    console.error("Reject street error:", error);
    throw error;
  }
};

// street type
export const adminGetStreetTypes = async (
  StreetTypeName?: string,
  SortBy?: string,
  IsDescending?: boolean,
  PageNumber?: number,
  PageSize?: number
) => {
  try {
    const response = await reApi.get("/api/streetType", {
      params: {
        StreetTypeName,
        SortBy,
        IsDescending,
        PageNumber,
        PageSize
      }
    });
    return response;
  } catch (error) {
    console.error("Admin get street types error:", error);
    throw error;
  }
};

export const adminGetStreetTypeById = async (streetTypeId: number) => {
  try {
    const response = await reApi.get(`/api/streetType/${streetTypeId}`);
    return response;
  } catch (error) {
    console.error("Admin get street type error:", error);
    throw error;
  }
};

export const adminCreateStreetType = async (
  streetType: CreateStreetTypeRequestDto
) => {
  try {
    const response = await reApi.post("/api/streetType", streetType);
    return response;
  } catch (error) {
    console.error("Admin create street type error:", error);
    throw error;
  }
};

export const adminUpdateStreetType = async (
  streetTypeId: number,
  streetType: UpdateStreetTypeRequestDto
) => {
  try {
    const response = await reApi.put(
      `/api/streetType/${streetTypeId}`,
      streetType
    );
    return response;
  } catch (error) {
    console.error("Admin update street type error:", error);
    throw error;
  }
};

export const adminDeleteStreetType = async (streetTypeId: number) => {
  try {
    const response = await reApi.delete(`/api/streetType/${streetTypeId}`);
    return response;
  } catch (error) {
    console.error("Admin delete street type error:", error);
    throw error;
  }
};

// auth
export const apiLogin = async (loginRequest: LoginRequestDto) => {
  try {
    const response = await reApi.post("/api/auth/login", loginRequest);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const apiLogout = async () => {
  try {
    const response = await reApi.post("/api/auth/logout");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
