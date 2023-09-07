import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { getAuthors } from "./authorFunctions";

// Define a type for the slice state

export interface Author {
  name: string;
  id: number;
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

export interface AuthorState {
  authors: Author[] | null;
  meta: Link | null;
  loading: boolean;
  error: null | any;
}

// Define the initial state using that type
const initialState: AuthorState = {
  authors: null,
  meta: null,
  loading: false,
  error: null,
};

export const authorSlice = createSlice({
  name: "author",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthors.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAuthors.fulfilled, (state, action) => {
      state.authors = action.payload.data;
      state.meta = action.payload.meta;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAuthors.rejected, (state, action) => {
      state.authors = null;
      state.meta = null;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {} = authorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.book.books;

export default authorSlice.reducer;
