import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryState } from "../types/Category";

/**
 * Slice have been configured according to redux documentation.
 * Information about usage can be found at https://redux-toolkit.js.org/tutorials/overview
 */
export const categorySlice = createSlice({
  name: "category-slice",
  initialState: {
    categoryList: [],
  } as CategoryState,
  reducers: {
    setCategory: (
      state: CategoryState,
      action: PayloadAction<CategoryState>
    ) => ({
      categoryList: action.payload.categoryList,
    }),
  },
});
