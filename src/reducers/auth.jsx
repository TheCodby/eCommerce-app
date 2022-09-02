import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    login: (state, action) => {
      state.auth = action.payload.auth;
    },
    logout: (state, action) => {
      state.auth = {};
    },
  },
});

export const login = auth.actions.login;
export const logout = auth.actions.logout;
export default auth.reducer;
