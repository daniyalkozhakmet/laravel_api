import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { bookAPI } from "./bookAPI";
import {
  getBooks,
  getBookByCategory,
  getBookById,
  filterBooks,
} from "./bookFunctions";

// Define a type for the slice state
export interface Category {
  name: string;
  id: number;
}
export interface Author {
  name: string;
  id: number;
}
export interface Book {
  name: string;
  id: string;
  description: string;
  categories: Category[];
  authors: Author[];
}
export interface Link {
  current_page: number;
  from_page: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
}
export interface BookState {
  books: Book[] | null;
  book: Book | null;
  meta: Link | null;
  loading: boolean;
  error: null | any;
  category_name: string | null;
}

// Define the initial state using that type
const initialState: BookState = {
  books: null,
  book: null,
  meta: null,
  category_name: null,
  loading: false,
  error: null,
};

export const bookSlice = createSlice({
  name: "book",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.books = action.payload.data;
      state.meta = action.payload.meta;
      state.category_name = null;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.books = null;
      state.meta = null;
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getBookByCategory.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBookByCategory.fulfilled, (state, action) => {
      state.books = action.payload.data.books;
      state.meta = action.payload.data.links;
      state.category_name = action.payload.data.name;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getBookByCategory.rejected, (state, action) => {
      state.books = null;
      state.meta = null;
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getBookById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBookById.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload.data;
      state.error = null;
    });
    builder.addCase(getBookById.rejected, (state, action) => {
      state.book = null;
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(filterBooks.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(filterBooks.fulfilled, (state, action) => {
      state.books = action.payload.data;
      state.meta = action.payload.meta;
      state.category_name = null;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(filterBooks.rejected, (state, action) => {
      state.books = null;
      state.meta = null;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {} = bookSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.book.books;

export default bookSlice.reducer;
