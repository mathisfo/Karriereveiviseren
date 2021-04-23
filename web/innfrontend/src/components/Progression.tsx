import React, { useEffect } from "react";
import Chart from "react-google-charts";
import { useSelector } from "react-redux";
import { Course } from "../store/interfaces/Course";
import { AppState } from "../store/redux/store";

const prepareChartData = (course: Course) => {
  let selectedCourse = [];
  let currentTime = new Date().getTime();
  let startDate = new Date(course.startDate).getTime();
  let endDate = new Date(course.endDate).getTime();
  selectedCourse.push(
    course.id,
    course.title,
    course.restriction,
    new Date(course.startDate),
    new Date(course.endDate),
    null,
    Math.min(100,Math.round((currentTime - startDate) / (endDate-startDate)*100)),
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
  const courses = useSelector((state: AppState) => state.courses.courseList);
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

  useEffect(() => {
    courses.map((course) => {
      if (course.isSelected) {
        let selectedCourse = prepareChartData(course);
        diagramData.push(selectedCourse);
      }
    });
  }, []);

/*
  if (diagramData.length = 8) {
    return (
      <div> Legg til kurs i listen under for å se din progresjon. </div>
    )}
  else {  
*/
  return (
    
    <div>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="Gantt"
        // TODO: Replace loader with loading wheel/bar
        loader={<div>Laster inn Gantt diagram...</div>}
        data={diagramData}
        options={{
          gantt: {
            trackHeight: 40,
            palette: [{
              "color": "#edc642",
              "dark": "#a38a36",
              "light": "#f6d66b"
            },
            {
              "color": "#eb6859",
              "dark": "#a52714",
              "light": "#f4c7c3"
            },
            {
              "color": "#49bf65",
              "dark": "#3a9951",
              "light": "#fce8b2"
            }]
          },
        }}
      />
    </div>
  );
};
// TODO heihei
export default Progression;


