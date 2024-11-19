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
