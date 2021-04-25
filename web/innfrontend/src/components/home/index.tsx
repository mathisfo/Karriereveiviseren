import React from "react";
import { Grid } from "semantic-ui-react";
import CourseList from "../courseList";
import Progression from "../progression";
import UserCourses from "../userCourses";

const Home = () => {
  return (
    <div>
      <Grid stackable relaxed>
        <Grid.Row>
          <CourseList />
          <UserCourses />
        </Grid.Row>
        <Progression />
      </Grid>
    </div>
  );
};

export default Home;
