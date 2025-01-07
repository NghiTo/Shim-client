import {
  AnswerRequest,
  QuestionUpdate,
  QuizFilter,
  QuizUpdate,
} from "../types/quiz.type";
import axiosInstance from "../utils/http";

export const createBlankQuiz = async () => {
  const res = await axiosInstance.post("/quiz");
  return res.data;
};

export const findQuizById = async (quizId: string) => {
  const res = await axiosInstance.get(`/quiz/${quizId}`);
  return res.data;
};

export const updateQuiz = async (quizId: string, data: QuizUpdate) => {
  const res = await axiosInstance.put(`/quiz/${quizId}`, data);
  return res.data;
};

export const getAllQuizzes = async (query?: QuizFilter) => {
  const res = await axiosInstance.get("/quiz", { params: query });
  return res.data.data;
};

export const deleteQuiz = async (quizId: string) => {
  const res = await axiosInstance.delete(`/quiz/${quizId}`);
  return res.data;
};

export const createMultipleChoiceQuestion = async (
  quizId: string,
  title: string,
  answers: AnswerRequest[]
) => {
  const res = await axiosInstance.post(`/quiz/${quizId}/multiple-choice`, {
    title,
    answers,
  });
  return res.data;
};

export const createFillInTheBlankQuestion = async (
  quizId: string,
  title: string,
  answers: AnswerRequest[]
) => {
  const res = await axiosInstance.post(`/quiz/${quizId}/fill-in-the-blank`, {
    title,
    answers,
  });
  return res.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const res = await axiosInstance.delete(`/quiz/${quizId}/${questionId}`);
  return res.data;
};

export const updateQuestion = async (
  quizId: string,
  questionId: string,
  data: QuestionUpdate
) => {
  const res = await axiosInstance.put(
    `/quiz/${quizId}/questions/${questionId}`,
    data
  );
  return res.data;
};

export const updateAllQuestions = async (
  quizId: string,
  data: QuestionUpdate
) => {
  const res = await axiosInstance.put(`/quiz/${quizId}/questions`, data);
  return res.data;
};

export const createQuizAttempt = async (quizId?: string) => {
  const res = await axiosInstance.post(`/quiz/${quizId}/start`);
  return res.data;
};
