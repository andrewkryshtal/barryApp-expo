import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state = initialState;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
