import { User } from "../interfaces/user.interface";
import { LoginForm, RegisterForm } from "../types/register.type";
import axiosInstance from "../utils/http";

export const findUserByEmail = async (email: string) => {
  const res = await axiosInstance.post("/users/email", { email });
  return res.data;
};

export const createUser = async (data: RegisterForm) => {
  const res = await axiosInstance.post("/users/register", data);
  return res.data;
};

export const login = async (data: LoginForm) => {
  const res = await axiosInstance.post("/users/login", data);
  return res.data;
};

export const findUserById = async (id: string) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data.data;
};

export const updateUser = async (id: string, data: User) => {
  const res = await axiosInstance.put(`/users/${id}`, data);
  return res.data;
};
