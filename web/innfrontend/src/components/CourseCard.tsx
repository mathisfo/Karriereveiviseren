import React, { Component, FC, useContext, useState } from "react";
import { CourseContext } from "../store/CourseContext";
import { render } from "@testing-library/react";
import {
  Card,
  Icon,
  Button,
  Checkbox,
  Label,
  Modal,
  Header,
} from "semantic-ui-react";

interface IProps {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  shortDescription: string;
  restriction: number;
  isSelected: boolean;
  category: string;
}

function setColor(modul?: number) {
  switch (modul) {
    case 1:
      return "yellow";
    case 2:
      return "green";
    case 3:
      return "red";
    default:
      return "teal";
  }
}

const CourseCard: FC<IProps> = (props) => {
  const courseContext = useContext(CourseContext);
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);

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
      <Card style={{ margin: "1.2em" }}>
        <Card.Content>
          <Card.Header>
            {props.title}
            <Label
              color={setColor(props.restriction)}
              style={{ float: "right", margin: 4 }}
            >
              Spor {props.restriction}
            </Label>
          </Card.Header>
          <Card.Meta>{props.category}</Card.Meta>
          <Card.Description>{props.shortDescription}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button>Mer informasjon</Button>}
            >
              <Modal.Header>{props.title}</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>{props.category}</Header>
                  <p>{props.description}</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                  Gå tilbake
                </Button>
                <Button
                  content="Legg til dette tiltaket"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => setOpen(false)}
                  positive
                />
              </Modal.Actions>
            </Modal>
            <Checkbox toggle label="Velg" basic color="red"></Checkbox>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CourseCard;
