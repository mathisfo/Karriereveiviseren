import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

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
      const selectedCoursesURL: Array<string> = [];
      state.courseList.map((course) => {
        if (course.id == action.payload.id) {

          if (action.payload.isSelected) {
            selectedCoursesURL.push(action.payload.url)
          }

          else if (!action.payload.isSelected) {
            let selectedurl = selectedCoursesURL.indexOf(action.payload.url)
            selectedCoursesURL.splice(selectedurl,1)
          }
          
          course.isSelected = !course.isSelected;


            axios.put(
              "api/userpreferences/1/",
              {
                user: "http://127.0.0.1:8000/api/users/1/",
                selected: selectedCoursesURL,
              },
        
              {
                withCredentials: true,
              }
            );
        }
      });
    },
  },
});
