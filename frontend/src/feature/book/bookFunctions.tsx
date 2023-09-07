import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../user/userFunctions";
import { bookAPI } from "./bookAPI";
export const getBooks = createAsyncThunk(
  "books/getBooks",
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
        `${bookAPI.getBooks}?page=${placeholder}`,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBookByCategory = createAsyncThunk(
  "books/getBooksByCategory",
  async (placeholder: { page: string; id: string }, { rejectWithValue }) => {
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
        `${bookAPI.getBooksByCategory}/${placeholder.id}?page=${placeholder.page}`,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBookById = createAsyncThunk(
  "books/getBooksById",
  async (id: string, { rejectWithValue }) => {
    try {
      let token: string | false = getToken("token");
      let config = {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${bookAPI.getBooksById}/${id}`, config);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const filterBooks = createAsyncThunk(
  "books/filter",
  async (search: string, { rejectWithValue }) => {
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
        `${bookAPI.searchBooksByName}?search=${search}`,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
