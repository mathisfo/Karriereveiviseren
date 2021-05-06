import React, { useEffect, useState } from "react";
import { Divider, Grid } from "semantic-ui-react";
import { AppState, useAppDispatch } from "../../redux/store/store";
import { useSelector } from "react-redux";
import {
  fetchCourse,
  fetchUserpreference,
} from "../../redux/slices/courseSlice";
import axios from "axios";
import { categorySlice } from "../../redux/slices/categorySlice";
import { ownCourseSlice } from "../../redux/slices/ownCourseSlice";
import { OwnCourse } from "../../redux/types/OwnCourse";
import UserDefinedCourseAccordion from "../userCourses/UserDefinedCourseAccordion";
import UserCourseAccordion from "../userCourses/UserCourseAccordion";
import CourseAccordion from "../courseList/CourseAccordion";
import CourseTimeline from "../progression/CourseTimeline";

import styles from "../courseList/CourseList.module.css";

const Home = () => {
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

  const fetchOwnCourses = async () => {
    let response = await axios
      .get("api/owncourse/", { withCredentials: true })
      .then((result) => {
        dispatch(ownCourseSlice.actions.resetOwnCourses());
        let courses: Array<OwnCourse> = result.data;
        courses.map((course) => {
          dispatch(ownCourseSlice.actions.addOwnCourse(course));
        });
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchCourses();
    fetchOwnCourses();
  }, []);

  return (
    <div>
      <Grid doubling columns={2}>
        <Grid.Row>
          <Grid.Column>
            <div className={`${styles.courseListContainer} ${styles.default}`}>
              <CourseAccordion />
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              <Grid doubling columns={2}>
                <Grid.Row>
                  <h2> Mine aktiviteter </h2>
                </Grid.Row>
                <Grid.Row></Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <UserDefinedCourseAccordion />
                  </Grid.Column>
                  <Grid.Column>
                    <UserCourseAccordion />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
        <Divider style={{ marginBottom: "5em" }} />
        <Grid.Row>
          <CourseTimeline />
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
