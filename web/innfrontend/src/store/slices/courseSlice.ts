import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Course } from "../interfaces/Course";
import { CourseState } from "../types/CourseState";

export const courseSlice = createSlice({
  name: "course-slice",
  initialState: {
    courseList: [],
  } as CourseState,
  reducers: {
    setCourses: (state: CourseState, action: PayloadAction<CourseState>) => ({
      courseList: action.payload.courseList,
    }),
    addCourse: (state: CourseState, action: PayloadAction<Course>) => ({
      
      courseList: [...state.courseList, action.payload]
    }),
    selectCourse: (state: CourseState, action: PayloadAction<Course>) => {
      state.courseList.map((course) => {
        if (course.id == action.payload.id) {
          course.isSelected = !course.isSelected;
        }
      });
    },
  },
});
