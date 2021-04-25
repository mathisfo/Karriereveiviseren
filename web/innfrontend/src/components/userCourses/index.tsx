import React from "react";
import { Grid } from "semantic-ui-react";
import UserCourseAccordion from "./UserCourseAccordion";

const UserCourses = () => {
  return (
        <Grid.Column width={8}>
          <h2> Mine aktiviteter </h2>
          <UserCourseAccordion />
        </Grid.Column>
  );
};

export default UserCourses;
