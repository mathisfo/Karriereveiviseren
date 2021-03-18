import React, { Component, FC, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CourseContext } from "../store/CourseContext";


interface IProps {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  restriction: number;
  isSelected: boolean;
}

function setColor(modul?: number) {
  switch (modul) {
    case 1:
      return "#f6d66b";
    case 2:
      return "#49bf65";
    case 3:
      return "#eb6859";
    default:
      return "grey";
  }
}

const CourseCard: FC<IProps> = (props) => {
  const courseContext = useContext(CourseContext);

  let newCourseList = courseContext?.state.courseList;

  // This should not be this complicated
  // TODO: Find a better way to handle this
  function selectCard() {
    newCourseList = newCourseList?.map(
      (course) => {
        if(course.id == props.id) {
          course.isSelected = !course.isSelected;
        }
        return course;
      }
    )
    if(newCourseList) {
      courseContext?.dispatch({type: "COURSE_SELECT", payload: newCourseList});
    }
  };

  return (
    <div>
      <Card
        style={{
          width: "18rem",
          background: setColor(props.restriction),
          margin: "1cm",
        }}
      >
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="primary">Mer informasjon</Button>
          <Button variant="primary" onClick={selectCard}>Select</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CourseCard;
