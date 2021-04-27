import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Course } from "../interfaces/Course";
import { User } from "../interfaces/User";
import { CourseState } from "../types/CourseState";

type selectType = {
  course: Course;
  user: User;
}

type FetchCourseError = {
  message: string;
};

// fetchCourses
export const fetchCourse = createAsyncThunk<
  Array<Course>,
  undefined,
  { rejectValue: FetchCourseError }
>("course/fetch", async (undefined, thunkAPI) => {
  let response = await axios.get("api/course", { withCredentials: true });
  let result = await response.data;
  if (response.status != 200) {
    return thunkAPI.rejectWithValue(result);
  }
  return result;
});

export const selectCourse = createAsyncThunk<
  Course,
  selectType,
  { rejectValue: FetchCourseError }
>("category/update", async (data, thunkAPI) => {
  let response = await axios.put(
    "api/userpreferences/1/",
    { user: `http://127.0.0.1:8000/api/users/${data.user.id}/`, selected: [data.course.url] },
    { withCredentials: true }
  );
  let result = await response.data;
  if (response.status != 200) {
    return thunkAPI.rejectWithValue(result);
  }

  // must check to see if response.data includes course url dispatched
  return data.course;
});

export const courseSlice = createSlice({
  name: "course-slice",
  initialState: {
    courseList: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  } as CourseState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.fulfilled, (state, { payload }) => {
      state.courseList = payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(fetchCourse.rejected, (state, { payload }) => {
      if (payload) {
        console.error(payload);
        state.errorMessage = payload.message;
      }
      state.isFetching = false;
      state.isError = true;
      return state;
    });
    builder.addCase(fetchCourse.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(selectCourse.fulfilled, (state, { payload }) => {
      state.courseList.map((course) => {
        if (course.id == payload.id) {
          course.isSelected = !course.isSelected;
        }
      });
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(selectCourse.rejected, (state, { payload }) => {
      if (payload) {
        console.error(payload);
        state.errorMessage = payload.message;
      }
      state.isFetching = false;
      state.isError = true;
      return state;
    });
    builder.addCase(selectCourse.pending, (state) => {
      state.isFetching = true;
    })
  },
});
