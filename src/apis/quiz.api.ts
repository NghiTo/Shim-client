import { AnswerRequest, quizSetting } from "../types/quiz.type";
import axiosInstance from "../utils/http";

export const createBlankQuiz = async (userId: string) => {
  const res = await axiosInstance.post("/quiz", { userId });
  return res.data;
};

export const findQuizById = async (quizId: string) => {
  const res = await axiosInstance.get(`/quiz/${quizId}`);
  return res.data;
};

export const updateQuiz = async (quizId: string, data: quizSetting) => {
  const res = await axiosInstance.put(`/quiz/${quizId}`, data);
  return res.data;
};

export const createMultipleChoiceQuestion = async (
  quizId: string,
  title: string,
  answers: AnswerRequest[]
) => {
  const res = await axiosInstance.post(`/quiz/${quizId}`, { title, answers });
  return res.data;
};

export const getAllQuestions = async (quizId: string) => {
  const res = await axiosInstance.get(`/quiz/${quizId}/questions`);
  return res.data;
};
