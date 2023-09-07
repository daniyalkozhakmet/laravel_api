import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";
import axios from "axios";
const storeToken = (token: string) => {
  localStorage.setItem("token", token.slice(1, token.length - 1));
};

export const getToken = (tokenname: string): string | false => {
  const token: string | null = localStorage.getItem(tokenname);
  if (token) {
    return token;
  }
  return false;
};

export const deleteToken = (tokenname: string): boolean => {
  const token: string | null = localStorage.getItem(tokenname);
  if (token) {
    localStorage.removeItem(tokenname);
    return true;
  }
  return false;
};

export const login = createAsyncThunk(
  "users/login",
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
      };
      const response = await axios.post(userAPI.login, user, config);
      storeToken(JSON.stringify(response.data.data.token));

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "users/register",
  async (
    user: {
      email: string;
      password: string;
      name: string;
      password_confirmation: string;
    },
    { rejectWithValue }
  ) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
      };
      const response = await axios.post(userAPI.register, user, config);
      console.log(response.data.data);
      storeToken(JSON.stringify(response.data.data.token));
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk("users/logout", async () => {
  try {
    let token: string | false = getToken("token");
    let config = {
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    };
    deleteToken("token");
    const response = await axios.post(userAPI.logout, config);

    return response.data;
  } catch (error: any) {
    // return rejectWithValue(error.response.data);
  }
});
export const ifAuth = (): boolean => {
  if (getToken("token")) {
    return true;
  }
  return false;
};
