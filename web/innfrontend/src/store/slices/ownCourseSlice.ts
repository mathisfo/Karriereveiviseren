import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { OwnCourse } from "../interfaces/OwnCourse";
import { OwnCourseState } from "../types/OwnCourseState";
import axios from "axios";

export const ownCourseSlice = createSlice({
  name: "own-course-slice",
  initialState: {
    ownCourseList: [],
  } as OwnCourseState,
  reducers: {
    setOwnCourses: (state: OwnCourseState, action: PayloadAction<OwnCourseState>) => ({
      ownCourseList: action.payload.ownCourseList,
    }),
    addOwnCourse: (state: OwnCourseState, action: PayloadAction<OwnCourse>) => ({
      
      ownCourseList: [...state.ownCourseList, action.payload]
    }),
    removeOwnCourse: (state: OwnCourseState, action: PayloadAction<OwnCourse>) => {
      axios.delete(`api/owncourse/${action.payload.id}`);
    },
  },
});
