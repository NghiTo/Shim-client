import axiosInstance from "../utils/http";

export const getTeachers = async (page: number, pageSize: number, schoolId: string) => {
  const res = await axiosInstance.get("/teachers", {
    params: { page, pageSize, schoolId },
  });
  return res.data
};
