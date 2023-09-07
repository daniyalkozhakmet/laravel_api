import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../user/userFunctions";
import { authorAPI } from "./authorAPI";
export const getAuthors = createAsyncThunk(
  "author/getAuthors",
  async (placeholder: string, { rejectWithValue }) => {
    try {
      let token: string | false = getToken("token");
      let config = {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${authorAPI.getAuthors}?page=${placeholder}`,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
