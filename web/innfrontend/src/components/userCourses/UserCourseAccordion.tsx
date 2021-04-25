import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../store/redux/store";

import {
  Accordion,
  Button,
  Grid,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import SubmitCourseForm from "../SubmitCourseForm";
import axios from "axios";
import { ownCourseSlice } from "../../store/slices/ownCourseSlice";
import { OwnCourse } from "../../store/interfaces/OwnCourse";


const UserCourseAccordion = () => {
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
          <Header h1>INN</Header>
          <Accordion fluid styled>
            {courses.map((course: any) =>
              course.isSelected ? (
                <div>
                  <Accordion.Title
                    active={activeIndex === courses.indexOf(course)}
                    onClick={(e) => handleClick(courses.indexOf(course))}
                  >
                    <Icon name="dropdown" />
                    {course.title}
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === courses.indexOf(course)}
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
          <Header h1 floated="left">Egendefinerte </Header>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Button primary circular animated="vertical" size="small">
                <Button.Content hidden>Legg til</Button.Content>
                <Button.Content visible>
                  <Icon name="add" />
                </Button.Content>
              </Button>
            }
          >
            <Modal.Content>
              <SubmitCourseForm />
            </Modal.Content>

            <Modal.Actions>
              <Button color="black" onClick={() => setOpen(false)}>
                Gå tilbake
              </Button>
            </Modal.Actions>
          </Modal>

          <Accordion fluid styled>
            {owncourses.map((course: OwnCourse) => (
              <div>
                <Accordion.Title
                  active={activeIndex === owncourses.indexOf(course)}
                  onClick={(e) => handleClick(owncourses.indexOf(course))}
                >
                  <Icon name="dropdown" />
                  {course.title}
                </Accordion.Title>
                <Accordion.Content
                  active={activeIndex === owncourses.indexOf(course)}
                >
                  {course.description}
                </Accordion.Content>
              </div>
            ))}
          </Accordion>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UserCourseAccordion;
function setError(error: any) {
  throw new Error("Function not implemented.");
}
