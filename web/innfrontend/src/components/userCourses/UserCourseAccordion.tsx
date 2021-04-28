import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../store/redux/store";

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
import SubmitCourseForm from "../SubmitCourseForm";
import axios from "axios";
import { ownCourseSlice } from "../../store/slices/ownCourseSlice";
import { Course } from "../../store/interfaces/Course";
import { OwnCourse } from "../../store/interfaces/OwnCourse";
import CourseAccordion from "../courseList/CourseAccordion";
import {
  fetchCourse,
  fetchUserpreference,
} from "../../store/slices/courseSlice";

const UserCourseAccordion = () => {
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const user = useSelector((state: AppState) => state.user.user);
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

  const fetchCourses = async () => {
    dispatch(fetchCourse());
    dispatch(fetchUserpreference(user));
  };

  const fetchOwnCourses = async () => {
    let response = await axios
      .get("api/owncourse/", { withCredentials: true })
      .then((result) => {
        let courses: Array<OwnCourse> = result.data;
        courses.map((course) => {
          dispatch(ownCourseSlice.actions.addOwnCourse(course));
        });
      });
  };

  useEffect(() => {
    fetchCourses();
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
          <Accordion fluid styled>
            <Header h1></Header>
            {owncourses.map((owncourse: any) =>
              owncourses.length > 0 ? (
                <div>
                  <Accordion.Title
                    active={activeIndex === owncourses.indexOf(owncourse.title)}
                    onClick={(e) => handleClick(1)}
                  >
                    <Icon name="dropdown" />
                    {owncourse.title}
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === owncourses.indexOf(owncourse.title)}
                  >
                    {owncourse.description}
                  </Accordion.Content>
                </div>
              ) : (
                <></>
              )
            )}
          </Accordion>
        </Grid.Column>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Add Course</Button>}
        >
          <Modal.Content>
            <SubmitCourseForm />
          </Modal.Content>

          <Modal.Actions>
            <Button
              content="Legg til aktivitet"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setOpen(false)}
              positive
            />
            <Button
              content="Avbryt"
              color="red"
              onClick={() => setOpen(false)}
            />
          </Modal.Actions>
        </Modal>
      </Grid>
    </div>
  );
};

export default UserCourseAccordion;
