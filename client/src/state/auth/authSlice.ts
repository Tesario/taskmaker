import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userI } from "types/auth";

interface authI {
  user: userI | null;
}

const initialState: authI = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: authI, action: PayloadAction<userI>) => {
      return {
        user: action.payload,
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
