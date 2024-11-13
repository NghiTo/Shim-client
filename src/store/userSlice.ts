import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/user.interface";

const initialState: User = {
  id: null,
  schoolId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.id = action.payload.id;
      state.schoolId= action.payload.schoolId;
    },
    clearUser(state) {
      state.id = null;
      state.schoolId = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
