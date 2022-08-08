import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userI } from "types/auth";
import Cookie from "js-cookie";

interface authI {
  user: userI | null;
}

const initialState: authI = {
  user: Cookie.get("token") ? { loading: true } : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: ({}, action: PayloadAction<userI>) => {
      return {
        user: { ...action.payload, loading: false },
      };
    },
    signOut: () => {
      return {
        user: null,
      };
    },
  },
});

export const { login, signOut } = authSlice.actions;

export default authSlice.reducer;
