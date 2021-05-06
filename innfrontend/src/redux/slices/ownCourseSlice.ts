import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { OwnCourse } from "../types/OwnCourse";
import { OwnCourseState } from "../types/OwnCourse";

/**
 * Slice have been configured according to redux documentation.
 * Information about usage can be found at https://redux-toolkit.js.org/tutorials/overview
 */
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
