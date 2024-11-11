import { RegisterForm } from "../types/register.type";
import axiosInstance from "../utils/http";

export const findUserByEmail = async (email: string) => {
  const res = await axiosInstance.post("/users/email", { email });
  return res.data;
};

export const createUser = async (data: RegisterForm) => {
  const res = await axiosInstance.post("/users/register", data);
  return res.data;
};
