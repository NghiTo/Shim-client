import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  attemptId: "",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAttemptId(state, action: PayloadAction<{ attemptId: string }>) {
      state.attemptId = action.payload.attemptId;
    },
    resetAttemptId: (state) => {
      state.attemptId = "";
    },
  },
});

export const { setAttemptId, resetAttemptId } = quizSlice.actions;
export default quizSlice.reducer;
