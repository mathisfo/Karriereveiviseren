import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../store/redux/store";

import {
  Accordion,
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Label,
  Modal,
} from "semantic-ui-react";
import SubmitCourseForm from "./SubmitCourseForm";
import axios from "axios";
import { ownCourseSlice } from "../store/slices/ownCourseSlice";
import { Course } from "../store/interfaces/Course";
import { OwnCourse } from "../store/interfaces/OwnCourse";

const MyCourses = () => {
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const owncourses = useSelector(
    (state: AppState) => state.owncourses.ownCourseList
  );
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  const fetchOwnCourses = async () => {
    axios.get("api/owncourse/", { withCredentials: true }).then(
      (response) => {
        dispatch(
          ownCourseSlice.actions.setOwnCourses({
            ownCourseList: response.data,
          })
        );
        console.log(response.data);
      },
      (error) => {
        setError(error);
      }
    );
  };

  useEffect(() => {
    fetchOwnCourses();
  }, []);

  return (
    <div>
      <Grid columns={2} relaxed="very">
        <Grid.Column>
          <Header h1>INN Aktiviteter</Header>
          <Accordion fluid styled>
            {courses.map((course: any) =>
              course.isSelected ? (
                <div>
                  <Accordion.Title
                    active={activeIndex === courses.indexOf(course.title)}
                    onClick={(e) => handleClick(1)}
                  >
                    <Icon name="dropdown" />
                    {course.title}
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === courses.indexOf(course.title)}
                  >
                    {course.description}
                  </Accordion.Content>
                </div>
              ) : (
                <></>
              )
            )}
          </Accordion>
        </Grid.Column>
        <Grid.Column>
          <Container>
            <Header h1>Egendefinerte Aktivteter</Header>
            <Container>
              {owncourses.map((e: OwnCourse) => (
                <Header>{e.title}</Header>
              ))}
            </Container>
          </Container>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default MyCourses;
function dispatch(arg0: {
  payload: import("../store/types/CourseState").CourseState;
  type: string;
}) {
  throw new Error("Function not implemented.");
}

function setError(error: any) {
  throw new Error("Function not implemented.");
}
