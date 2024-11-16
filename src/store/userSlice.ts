import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user.type";

const initialState: UserState = {
  id: "",
  schoolId: "",
  avatarUrl: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.schoolId = action.payload.schoolId;
      state.avatarUrl = action.payload.avatarUrl;
    },
    clearUser(state) {
      state.id = "";
      state.schoolId = "";
      state.avatarUrl = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
