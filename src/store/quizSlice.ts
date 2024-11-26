import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answer, QuizState } from "../types/quiz.type";

const initialState: QuizState = {
  question: "",
  answers: [],
  type: "",
  point: 1,
  time: 10,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestion(state, action: PayloadAction<string>) {
      state.question = action.payload;
    },
    setAnswers(state, action: PayloadAction<Answer[]>) {
      state.answers = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setPoint(state, action: PayloadAction<number>) {
      state.point = action.payload;
    },
    setTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
    },
    resetQuiz() {
      return initialState;
    },
  },
});

export const {
  setQuestion,
  setAnswers,
  setType,
  setPoint,
  setTime,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
