import React, { FC, useContext, useState } from "react";
import { CourseContext } from "../store/CourseContext";
import {
  Card,
  Button,
  Checkbox,
  Label,
  Modal,
  Header,
} from "semantic-ui-react";
import { Icon } from "@iconify/react";
import googleClassroom from "@iconify-icons/mdi/google-classroom";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
  classroom: string;
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

      //TODO: Delete this
      axios.put(
        "http://localhost:8000/api/userpreferences/1/",
        {
          selected: [
            "http://localhost:8000/api/course/2/",
            "http://localhost:8000/api/course/3/",
          ],
        },
        {
          withCredentials: true,
        }
      );
    }
  }

  function openTab() {
    window.open(props.classroom);
  }

  function renderLink() {
    if (props.classroom != "") {
      return (
        <Button target color="blue" floated="right" size="tiny">
          <Link
          className="link"
          to="googleClassroom"
          target="_blank"
          onClick={openTab}
        >
          <Icon icon={googleClassroom} width="1.7em" color="white" />{" "}
          Google Classroom
        </Link>
        </Button> )
      
  }}

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
              {" "}
              Spor {props.restriction}{" "}
            </Label>
          </Card.Header>
          <Card.Meta>{props.category}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button style={{ marginRight: "1em" }}>Mer informasjon</Button>
              }
              size="tiny"
            >
              <Modal.Header>
                {props.title}
                {renderLink()}
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>{props.category}</Header>
                  <p>{props.shortDescription}</p>
                  <p>{props.description}</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  content="Gå tilbake"
                  color="black"
                  icon="arrow left"
                  onClick={() => setOpen(false)}
                ></Button>
                <Button
                  content="Velg dette tiltaket"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => selectCard()}
                  positive
                />
              </Modal.Actions>
            </Modal>
            <Checkbox
              toggle
              label="Velg"
              basic
              onChange={() => selectCard()}
            ></Checkbox>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CourseCard;
