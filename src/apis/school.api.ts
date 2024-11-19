import axiosInstance from "../utils/http";

export const getSchools = async (page: number, pageSize: number) => {
  const res = await axiosInstance.get("/schools", {
    params: { page, pageSize },
  });
  return res.data;
};

export const findSchoolById = async (id: string) => {
  const res = await axiosInstance.get(`/schools/${id}`);
  return res.data;
};
