import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import UserCourseAccordion from "./UserCourseAccordion";
import UserDefinedCourseAccordion from "./UserDefinedCourseAccordion";

// TODO: adjust style based on props from parent. If self-contained
// make adjustments based on larger width
interface Iprops {
  isExpanded: boolean;
}

const UserCourses = (props: Iprops) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [componentStyling, setComponentStyling] = useState("");

  useEffect(() => {
    setIsExpanded(props.isExpanded);
  }, []);

  useEffect(() => {
    setComponentStyling(isExpanded ? "expanded" : "default");
  }, [isExpanded]);

  return (
    <div>
      <Grid columns={2}>
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
