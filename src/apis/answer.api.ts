import axiosInstance from "../utils/http";

export const createAnswer = async (
  userId: string,
  questionId?: string,
  quizId?: string,
  answer?: string
) => {
  const res = await axiosInstance.post(`/answers`, {
    userId,
    questionId,
    quizId,
    answer,
  });
  return res.data;
};
