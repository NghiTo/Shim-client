import {
  LoginForm,
  UserPassword,
  UserRegister,
  UserUpdate,
} from "../types/user.type";
import axiosInstance from "../utils/http";

export const findUserByEmail = async (email: string) => {
  const res = await axiosInstance.post("/users/email", { email });
  return res.data;
};

export const createUser = async (data: UserRegister) => {
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

export const updateUser = async (id: string, data: UserUpdate) => {
  const res = await axiosInstance.put(`/users/${id}`, data);
  return res.data;
};

export const changePassword = async (id: string, data: UserPassword) => {
  const res = await axiosInstance.put(`/users/changePassword/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res;
};