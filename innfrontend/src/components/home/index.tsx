import React from "react";
import { Divider, Grid } from "semantic-ui-react";
import CourseList from "../courseList";
import Progression from "../progression";
import UserCourses from "../userCourses";

// TODO: adjust style based on props from parent. If self-contained
// make adjustments based on larger width

const Home = () => {
  return (
    <div>
      <Grid doubling columns={2}>
        <Grid.Row>
          <Grid.Column>
            <CourseList isExpanded={false} />
          </Grid.Column>
          <Grid.Column>
            <UserCourses isExpanded={false} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
        <Divider style={{ marginBottom: "5em" }} />
        <Grid.Row>
          <Progression isExpanded={false} />
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
