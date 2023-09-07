import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import {
  login,
  register,
  logout,
} from "./userFunctions";

// Define a type for the slice state
export interface Role {
  name: string;
  id: number;
}
export interface User {
  name: string;
  email: string;
}
export interface UserState {
  user: User | null;
  loading: boolean;
  error: null | any;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.user;

export default userSlice.reducer;
