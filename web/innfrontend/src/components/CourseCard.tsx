import React, { Component, FC, useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CourseContext } from "../store/CourseContext";
import Modal from "react-bootstrap/Modal";
import { render } from "@testing-library/react";


interface IProps {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  restriction: number;
  isSelected: boolean;
  category: string;
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
  const [show, setShow] = useState(false);

  let newCourseList = courseContext?.state.courseList;



  // This should not be this complicated
  // TODO: Find a better way to handle this
  function selectCard() {
    newCourseList = newCourseList?.map((course) => {
      if (course.id == props.id) {
        course.isSelected = !course.isSelected;
      }
      return course;
    });
    if (newCourseList) {
      courseContext?.dispatch({
        type: "COURSE_SELECT",
        payload: newCourseList,
      });
    }
  }

  return (
    <div>
    <Card
    style={{
      width: "20rem",
      height: "8rem",
      background: setColor(props.restriction),
      margin: "1cm",
      padding: "0.5rem",
    }}
  >
      <Card.Title>{props.title}</Card.Title>
      <Card.Body>
      <Button variant="primary" onClick={() => setShow(true)}>
      Mer informasjon
      </Button>{" "}
      <Button variant="primary" onClick={selectCard}>Velg</Button>
      </Card.Body>
      </Card>
      <Modal
      centered
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
          <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          {props.description}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CourseCard;
