import React, { FC, useContext, useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../store/redux/store";
import { courseSlice } from "../store/slices/courseSlice";
import { Course } from "../store/interfaces/Course";
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

const CourseCard: FC<Course> = (props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);


  // This should not be this complicated
  // TODO: Find a better way to handle this
  function selectCard() {
    dispatch(courseSlice.actions.selectCourse(props));
  }

  function openTab() {
    window.open(props.classroom);
  }

  return (
    <div>
      <Card style={{ margin: "1.2em" }} data-cy="courseCard">
        <Card.Content>
          <Card.Header data-cy="courseHeader">
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
                <Button style={{ marginRight: "1em" }} data-cy="infoButton">Mer informasjon</Button>
              }
              size="tiny"
            >
              <Modal.Header>
                <p>{props.title}</p>
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
                </Button>
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
              
              label="Velg"
              basic
              checked={props.isSelected}
              onChange={() => selectCard()}
              data-cy="checkbox"
            ></Checkbox>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CourseCard;
