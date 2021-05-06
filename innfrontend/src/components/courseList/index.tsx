import React, { useEffect, useState } from "react";
import CourseAccordion from "./CourseAccordion";
import { AppState, useAppDispatch } from "../../redux/store/store";
import {
  fetchCourse,
  fetchUserpreference,
} from "../../redux/slices/courseSlice";
import { useSelector } from "react-redux";
import styles from "./CourseList.module.css";
import axios from "axios";
import { categorySlice } from "../../redux/slices/categorySlice";

const CourseList = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) => state.user.user);
  const courses = useSelector((state: AppState) => state.courses.courseList);

  const fetchCategories = async () => {
    axios.get("api/category/", { withCredentials: true }).then(
      (response) => {
        dispatch(
          categorySlice.actions.setCategory({ categoryList: response.data })
        );
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fetchCourses = async () => {
    if (courses.length == 0) {
      dispatch(fetchCourse());
      dispatch(fetchUserpreference(user));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  return (
    <div className={`${styles.courseListContainer} ${styles.expanded}`}>
      <CourseAccordion />
    </div>
  );
};

export default CourseList;
