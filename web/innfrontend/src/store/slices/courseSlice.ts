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
  User,
  { rejectValue: FetchCourseError }
>("course/fetch", async (user, thunkAPI) => {
  let response = await axios.get("api/course", { withCredentials: true });
  let userprefResponse = await axios.get(`api/userpreferences/${user.id}/`, {withCredentials: true});
  
  let result = await response.data;

  if (response.status != 200) {
    return thunkAPI.rejectWithValue(result);
  }

  let courseResult: Array<Course> = result;
  let userprefResult: Array<Course> = await userprefResponse.data.selected;
  // TODO: rewrite to use filter
  if(userprefResult) {
    userprefResult.map(item => {
      courseResult.map(course => {
        if (course.id == item.id) {
          course.isSelected = true;
        }
      } )
    })
  }


  return result;
});

export const selectCourse = createAsyncThunk<
  Course,
  selectType,
  { rejectValue: FetchCourseError }
>("category/update", async (data, thunkAPI) => {
  let response = await axios.post(
    `api/userpreferences/`,
    { user: data.user.id, selected: [{title: data.course.title, description: data.course.description, category: data.course.category}], isSelected: data.course.isSelected },
    { withCredentials: true }
  );
  let result = await response.data;
  if (response.status != 200) {
    return thunkAPI.rejectWithValue(result);
  }
  
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
