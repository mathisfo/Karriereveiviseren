import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { courseSlice } from "../slices/courseSlice";
import { categorySlice } from "../slices/categorySlice";

export const store = configureStore({
  reducer: {
    courses: courseSlice.reducer,
    categories: categorySlice.reducer,
  }
})

export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();