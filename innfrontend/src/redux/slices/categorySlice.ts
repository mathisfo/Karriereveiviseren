import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CategoryState } from "../types/Category";

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
