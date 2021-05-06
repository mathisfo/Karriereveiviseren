import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { AppState, useAppDispatch } from "../../redux/store/store";
import {
  fetchCourse,
  fetchUserpreference,
} from "../../redux/slices/courseSlice";
import UserCourseAccordion from "./UserCourseAccordion";
import UserDefinedCourseAccordion from "./UserDefinedCourseAccordion";
import axios from "axios";
import { ownCourseSlice } from "../../redux/slices/ownCourseSlice";
import { OwnCourse } from "../../redux/types/OwnCourse";

const UserCourses = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) => state.user.user);
  const courses = useSelector((state: AppState) => state.courses.courseList);

  const fetchCourses = () => {
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
    fetchCourses();
    fetchOwnCourses();
  }, []);

  return (
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
  );
};

export default UserCourses;
