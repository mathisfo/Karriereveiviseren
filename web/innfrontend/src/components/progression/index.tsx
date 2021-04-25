import React from "react";
import { Grid } from "semantic-ui-react";
import CourseChart from "./CourseChart";
import CourseTimeline from "./CourseTimeline";

const Progression = () => {
  return (
    <>
      <Grid.Row stretched></Grid.Row>
      <Grid.Row divided>
        <CourseTimeline />
      </Grid.Row>
    </>
  );
};

export default Progression;
