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
    selectCourse: {
      reducer: (state, action: PayloadAction<Course>) => {
        state.courseList.map(course => {if(course == action.payload) {
          course.isSelected = !course.isSelected
        }})
      },
      prepare: (course: Course) => {
        return { payload: course }
      }
    }
  },
});
