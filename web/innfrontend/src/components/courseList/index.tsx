import React, { useEffect } from "react";
import CourseAccordion from "./CourseAccordion";
import { AppState, store, useAppDispatch } from "../../store/redux/store";
import {
  courseSlice,
  fetchCourse,
  fetchUserpreference,
} from "../../store/slices/courseSlice";
import axios from "axios";
import { useSelector } from "react-redux";

const CourseList = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) => state.user.user);
  const courses = useSelector((state: AppState) => state.courses.courseList);

  const fetchCourses = async () => {
    dispatch(fetchCourse());
    dispatch(fetchUserpreference(user));
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return <CourseAccordion />;
};

export default CourseList;
