import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/utils";

const initialState = {
  user: {},
  token: null,
  expiresAt: null,
  isAuthenticated: false,
  status: STATUS.PENDING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token, expiresAt } = action.payload;
      state.user = user;
      state.token = token;
      state.expiresAt = expiresAt;
      state.isAuthenticated = true;
      state.status = STATUS.SUCCEEDED;
    },
    logout: (state) => {
      state.user = {};
      state.token = null;
      state.expiresAt = null;
      state.isAuthenticated = false;
      state.status = STATUS.IDLE;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload.status;
    },
  },
});

export const { login, logout, updateUser, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
