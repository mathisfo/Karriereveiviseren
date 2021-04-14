import React, { Component, FC, useContext, useState } from "react";
import { CourseContext } from "../store/CourseContext";
import Modal from "react-bootstrap/Modal";
import { render } from "@testing-library/react";
import { Card, Icon, Button, Checkbox, Label } from "semantic-ui-react";

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

  console.log(props.category);

  return (
    <div>
      <Card>
        <Card.Header header={props.title} />
        <Card.Content description={props.description} />
        <Card.Content extra>
          <Label color="orange">Spor {props.restriction}</Label>
          <Button label="Velg tiltak"></Button>
        </Card.Content>
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
          <h2>{props.category}</h2>
          <p>{props.description}</p>
          <p>Spor {props.restriction}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CourseCard;
