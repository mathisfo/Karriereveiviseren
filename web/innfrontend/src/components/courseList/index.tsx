import React, { useEffect } from "react";
import CourseAccordion from "./CourseAccordion";
import { AppState, store, useAppDispatch } from "../../store/redux/store";
import { courseSlice } from "../../store/slices/courseSlice";
import axios from "axios";
import { useSelector } from "react-redux";

const CourseList = () => {
  const dispatch = useAppDispatch();
  const courses = useSelector((state: AppState) => state.courses.courseList);

  const fetchCourses = async () => {
    if (courses.length <= 0)
      axios.get("api/course/", { withCredentials: true }).then((response) => {
        dispatch(courseSlice.actions.setCourses({ courseList: response.data }));
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return <CourseAccordion />;
};

export default CourseList;
