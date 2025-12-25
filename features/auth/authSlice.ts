import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  jwt: string | null;
}

const initialState: AuthState = {
  jwt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setJWT: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    clearJWT: (state) => {
      state.jwt = null;
    },
  },
});

export const { setJWT, clearJWT } = authSlice.actions;

export default authSlice.reducer;
