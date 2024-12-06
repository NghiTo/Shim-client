import axiosInstance from "../utils/http";

export const getNewAccessToken = async () => {
  const response = await axiosInstance.get("/auth/refreshToken");
  return response;
};

export const sendOtp = async () => {
  const res = await axiosInstance.get("/auth/sendOtp");
  return res;
};

export const verifyOtp = async (otp: string) => {
  const res = await axiosInstance.post("/auth/verifyOtp", { otp });
  return res;
};

export const googleAuth = async () => {
  const res = await axiosInstance.post("/auth/google");
  return res.data;
};

export const login = async (id: string) => {
  const res = await axiosInstance.post("/auth/login", { id });
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await axiosInstance.post(`/auth/reset-password`, {
    token,
    password,
  });
  return res.data;
};