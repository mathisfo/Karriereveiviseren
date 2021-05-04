import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { courseSlice } from "../slices/courseSlice";
import { categorySlice } from "../slices/categorySlice";
import { ownCourseSlice } from "../slices/ownCourseSlice";
import { userSlice } from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    courses: courseSlice.reducer,
    categories: categorySlice.reducer,
    owncourses: ownCourseSlice.reducer,
    user: userSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
