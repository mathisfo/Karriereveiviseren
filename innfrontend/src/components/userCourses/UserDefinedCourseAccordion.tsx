import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  Button,
  Grid,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import { OwnCourse } from "../../redux/types/OwnCourse";
import { AppState, useAppDispatch } from "../../redux/store/store";
import { ownCourseSlice } from "../../redux/slices/ownCourseSlice";
import SubmitCourseForm from "../SubmitCourseForm";

import styles from "./UserCourse.module.css";
import { convertDate } from "../../utils/helpers";

const UserDefinedCourseAccordion = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const dispatch = useAppDispatch();
  const owncourses = useSelector(
    (state: AppState) => state.owncourses.ownCourseList
  );

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  const fetchOwnCourses = async () => {
    let response = await axios
      .get("api/owncourse/", { withCredentials: true })
      .then((result) => {
        dispatch(ownCourseSlice.actions.resetOwnCourses());
        let courses: Array<OwnCourse> = result.data;
        courses.map((course) => {
          dispatch(ownCourseSlice.actions.addOwnCourse(course));
        });
      });
  };

  useEffect(() => {
    fetchOwnCourses();
  }, []);

  return (
    <div>
      <Grid padded>
        <Grid.Column>
          <Grid.Row>
            <Grid columns={3}>
              <Grid.Column>
                <Header as="h2" style={{ marginBottom: "1em" }}>
                  Egendefinerte{" "}
                </Header>
              </Grid.Column>
            </Grid>
          </Grid.Row>

          <Grid.Row>
            <Accordion fluid styled>
              {owncourses.map((course: OwnCourse) => (
                <div>
                  <Accordion.Title
                    style={{ fontSize: 18 }}
                    active={activeIndex === owncourses.indexOf(course)}
                    onClick={(e) => handleClick(owncourses.indexOf(course))}
                    className={styles.wordBreak}
                    data-cy="userDefinedAccordion"
                  >
                    <Icon name="dropdown" />
                    {course.title}
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === owncourses.indexOf(course)}
                    className={styles.wordBreak}
                  >
                    <p>{course.description}</p>
                    <p>
                      <Icon name="trophy" />
                      <b> Mål: </b>
                      {course.goal}
                    </p>
                    <p>
                      <Icon name="calendar alternate outline" />
                      <b>Dato: </b>Fra {convertDate(course.startDate)} til{" "}
                      {convertDate(course.endDate)}.
                    </p>
                  </Accordion.Content>
                </div>
              ))}
            </Accordion>
          </Grid.Row>
          <Grid.Row>
            <Modal
              closeIcon
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
                <Button
                  icon
                  color="facebook"
                  style={{ marginTop: "1em" }}
                  data-cy="addButton"
                >
                  <Icon name="add" />
                </Button>
              }
            >
              <Modal.Header>Legg til egen aktivitet</Modal.Header>
              <Modal.Content>
                <SubmitCourseForm />
              </Modal.Content>
            </Modal>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UserDefinedCourseAccordion;
