import React, { useEffect, useState } from "react";
import CourseChart from "./CourseChart";
import CourseTimeline from "./CourseTimeline";

interface Iprops {
  isExpanded: boolean;
}

const Progression = (props: Iprops) => {
  const [isExpanded, setIsExpanded] = useState(false);

  //  TODO: REMOVE this if left unused. On this component we might
  //  not need different styling rules in such a way
  const [componentStyling, setComponentStyling] = useState("");

  useEffect(() => {
    setIsExpanded(props.isExpanded);
  }, []);

  useEffect(() => {
    setComponentStyling(isExpanded ? "expanded" : "default");
  }, [isExpanded]);

  return <>{isExpanded ? <CourseChart /> : <CourseTimeline />}</>;
};

export default Progression;
