import React, { useEffect, useState } from "react";
import CourseAccordion from "./CourseAccordion";
import { AppState, store, useAppDispatch } from "../../store/redux/store";
import {
  fetchCourse,
  fetchUserpreference,
} from "../../store/slices/courseSlice";
import { useSelector } from "react-redux";
import styles from "./CourseList.module.css";

// TODO: adjust style based on props from parent. If self-contained
// make adjustments based on larger width

interface Iprops {
  isExpanded: boolean;
}

const CourseList = (props: Iprops) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [componentStyling, setComponentStyling] = useState(styles.default);
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) => state.user.user);
  const courses = useSelector((state: AppState) => state.courses.courseList);

  const fetchCourses = async () => {
    if (courses.length == 0) {
      dispatch(fetchCourse());
      dispatch(fetchUserpreference(user));
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  useEffect(() => {
    setIsExpanded(props.isExpanded);
  }, []);

  useEffect(() => {
    setComponentStyling(isExpanded ? styles.expanded : styles.default);
  }, [isExpanded]);

  return (
    <div className={`${styles.courseListContainer} ${componentStyling}`}>
      <CourseAccordion />
    </div>
  );
};

export default CourseList;
