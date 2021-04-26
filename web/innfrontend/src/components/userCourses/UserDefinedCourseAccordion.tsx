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
import { OwnCourse } from "../../store/interfaces/OwnCourse";
import { AppState, useAppDispatch } from "../../store/redux/store";
import { ownCourseSlice } from "../../store/slices/ownCourseSlice";
import SubmitCourseForm from "../SubmitCourseForm";

import styles from "./UserCourse.module.css";

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

  function setError(error: any) {
    throw new Error("Function not implemented.");
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
      <Grid padded>
        <Grid.Column>
          <Grid.Row>
            <Grid columns={3}>
              <Grid.Column>
                <Header h1>Egendefinerte </Header>
              </Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={
                    <Button primary circular animated="vertical" size="tiny">
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
              </Grid.Column>
            </Grid>
          </Grid.Row>

          <Grid.Row>
            <Accordion fluid styled>
              {owncourses.map((course: OwnCourse) => (
                <div>
                  <Accordion.Title
                    active={activeIndex === owncourses.indexOf(course)}
                    onClick={(e) => handleClick(owncourses.indexOf(course))}
                    className={styles.wordBreak}
                  >
                    <Icon name="dropdown" />
                    {course.title}
                  </Accordion.Title>
                  <Accordion.Content
                    active={activeIndex === owncourses.indexOf(course)}
                    className={styles.wordBreak}
                  >
                    {course.description}
                  </Accordion.Content>
                </div>
              ))}
            </Accordion>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UserDefinedCourseAccordion;
