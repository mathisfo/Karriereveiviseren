import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { AppState, useAppDispatch } from "../../store/redux/store";
import {
  fetchCourse,
  fetchUserpreference,
} from "../../store/slices/courseSlice";
import UserCourseAccordion from "./UserCourseAccordion";
import UserDefinedCourseAccordion from "./UserDefinedCourseAccordion";

// TODO: adjust style based on props from parent. If self-contained
// make adjustments based on larger width
interface Iprops {
  isExpanded: boolean;
}

const UserCourses = (props: Iprops) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) => state.user.user);
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const [isExpanded, setIsExpanded] = useState(false);
  const [componentStyling, setComponentStyling] = useState("");

  const fetchCourses = () => {
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
    setComponentStyling(isExpanded ? "expanded" : "default");
  }, [isExpanded]);

  return (
    <div>
      <Grid doubling columns={2}>
        <Grid.Row>
          <h2> Mine aktiviteter </h2>
        </Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <UserCourseAccordion />
          </Grid.Column>
          <Grid.Column>
            <UserDefinedCourseAccordion />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserCourses;
