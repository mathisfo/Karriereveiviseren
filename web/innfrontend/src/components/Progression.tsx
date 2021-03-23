import React, { useContext, useState, useEffect } from "react";
import Chart from "react-google-charts";
import { CourseContext } from "../store/CourseContext";
import { Course } from "../store/CourseContext/types";

const prepareChartData = (course: Course) => {
  let selectedCourse = [];
  selectedCourse.push(
    course.id,
    course.title,
    course.restriction,
    new Date(course.startDate),
    new Date(course.endDate),
    null,
    // TODO: Calculate percentage done
    100,
    //
    null
  );
  return selectedCourse;
};

interface IDiagramConst {
  type: string;
  label: string;
}

// TODO: make custom type prettier
type ChartTypes = Array<IDiagramConst> | Array<string | number | Date | null>;

const Progression = () => {
  const diagramData: Array<ChartTypes> = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
  ];

  const courseContext = useContext(CourseContext);

  useEffect(() => {
    courseContext?.state.courseList.map((course) => {
      if (course.isSelected) {
        let selectedCourse = prepareChartData(course);
        diagramData.push(selectedCourse);
      }
    });
  }, []);

  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="Gantt"
        // TODO: Replace loader with loading wheel/bar
        loader={<div>Laster inn Gantt diagram...</div>}
        data={diagramData}
        options={{
          height: 400,
          gantt: {
            trackHeight: 30,
          },
        }}
        // Why is rootProps here?
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default Progression;
