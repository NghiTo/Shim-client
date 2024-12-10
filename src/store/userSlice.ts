import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user.type";

const initialState: UserState = {
  id: "",
  role: "",
  schoolId: "",
  avatarUrl: "",
  isAuthUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.schoolId = action.payload.schoolId;
      state.avatarUrl = action.payload.avatarUrl;
      state.isAuthUser = action.payload.isAuthUser;
    },
    clearUser(state) {
      state.id = "";
      state.role = "";
      state.schoolId = "";
      state.avatarUrl = "";
      state.isAuthUser = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
