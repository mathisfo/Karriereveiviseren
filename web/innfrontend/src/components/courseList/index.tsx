import React, { useEffect } from "react";
import CourseAccordion from "./CourseAccordion";
import { AppState, store, useAppDispatch } from "../../store/redux/store";
import { courseSlice, fetchCourse } from "../../store/slices/courseSlice";
import axios from "axios";
import { useSelector } from "react-redux";

const CourseList = () => {
  const dispatch = useAppDispatch();
  const courses = useSelector((state: AppState) => state.courses.courseList);

  const fetchCourses = async () => {
    dispatch(fetchCourse());
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return <CourseAccordion />;
};

export default CourseList;
