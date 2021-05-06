import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { OwnCourse } from "../types/OwnCourse";
import { OwnCourseState } from "../types/OwnCourse";

export const ownCourseSlice = createSlice({
  name: "own-course-slice",
  initialState: {
    ownCourseList: [],
  } as OwnCourseState,
  reducers: {
    setOwnCourses: (
      state: OwnCourseState,
      action: PayloadAction<OwnCourseState>
    ) => ({
      ownCourseList: action.payload.ownCourseList,
    }),
    addOwnCourse: (
      state: OwnCourseState,
      action: PayloadAction<OwnCourse>
    ) => ({
      ownCourseList: [...state.ownCourseList, action.payload],
    }),
    resetOwnCourses: (state: OwnCourseState) => {
      state.ownCourseList = [];
    },
  },
});
