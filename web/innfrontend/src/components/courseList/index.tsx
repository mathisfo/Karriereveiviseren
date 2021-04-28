import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import CourseAccordion from "./CourseAccordion";

import styles from "./CourseList.module.css";

// TODO: adjust style based on props from parent. If self-contained
// make adjustments based on larger width

interface Iprops {
  isExpanded: boolean;
}

const CourseList = (props: Iprops) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [componentStyling, setComponentStyling] = useState(styles.default);

  useEffect(() => {
    setIsExpanded(props.isExpanded);
  }, []);

  useEffect(() => {
    setComponentStyling(isExpanded ? styles.expanded : styles.default);
  }, [isExpanded]);

  return (
    <div
      className={`${styles.courseListContainer} ${componentStyling}`}
    >
      <CourseAccordion />
    </div>
  );
};

export default CourseList;
