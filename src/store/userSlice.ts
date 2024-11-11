import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../interfaces/user.interface";

const initialState: UserState = {
  email: null,
  title: null,
  firstName: null,
  lastName: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.title = action.payload.title;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
    },
    clearUser(state) {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
