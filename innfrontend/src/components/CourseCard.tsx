import React, { FC } from "react";
import { Card, Button, Checkbox, Icon, Label, Modal } from "semantic-ui-react";
import { Icon as Iconify } from "@iconify/react";
import googleClassroom from "@iconify-icons/mdi/google-classroom";
import "../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store/store";
import { selectCourse } from "../redux/slices/courseSlice";
import { Course } from "../redux/types/Course";
import { convertDate, convertHours, setColor } from "../utils/helpers";

const CourseCard: FC<Course> = (props) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: AppState) => state.user);
  const [open, setOpen] = React.useState(false);

  function selectCard() {
    dispatch(selectCourse({ course: props, user: user }));
  }

  function openTab() {
    window.open(props.classroom);
  }

  function renderLink() {
    if (props.classroom != "") {
      return (
        <Button
          target
          color="blue"
          floated="right"
          size="tiny"
          data-cy="classroom"
        >
          <Link
            className="link"
            to="googleClassroom"
            target="_blank"
            onClick={openTab}
            style={{ color: "white" }}
          >
            <Iconify icon={googleClassroom} width="1.7em" color="white" />{" "}
            Google Classroom
          </Link>
        </Button>
      );
    }
  }

  return (
    <div>
      <Card
        style={{ margin: "1.2em", background: setColor(props.restriction) }}
        centered
        data-cy="courseCard"
      >
        <Card.Content>
          <Card.Header data-cy="courseHeader">
            {props.title}

            <Label inverted style={{ float: "right", margin: 4 }}>
              {" "}
              Spor {props.restriction}{" "}
            </Label>
          </Card.Header>
          <Card.Meta>
            <p>
              <Icon name="calendar alternate outline" />
              {convertDate(props.startDate)} - {convertDate(props.endDate)}
            </p>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className="">
            <Modal
              size="tiny"
              style={{
                height: "auto",
                top: "auto",
                left: "auto",
                right: "auto",
                bottom: "auto",
              }}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button icon color="facebook" data-cy="infoButton">
                  <Icon name="info circle" />
                </Button>
              }
            >
              <Modal.Header>
                {props.title}
                {renderLink()}
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <p>
                    <b>{props.shortDescription}</b>
                  </p>
                  <p>{props.description}</p>
                  <p>
                    <Icon name="calendar alternate outline" />
                    <b>Dato: </b>Fra {convertDate(props.startDate)} til{" "}
                    {convertDate(props.endDate)}.
                  </p>
                  <p>
                    <Icon name="clock" />
                    Kl. {convertHours(props.startDate)}{" "}
                  </p>
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
              style={{ float: "right", margin: 4 }}
              slider
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
