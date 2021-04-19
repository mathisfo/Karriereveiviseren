import React, { useContext, useState } from "react";
import { CourseContext } from "../store/CourseContext";
import CourseCard from "./CourseCard";
import {
  Accordion,
  Button,
  Container,
  Header,
  Icon,
  Label,
  Modal,
} from "semantic-ui-react";
import SubmitCourseForm from "./SubmitCourseForm";

const MyCourses = () => {
  const courseContext = useContext(CourseContext);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  

  return (
    <div>
      {/*}
      <Container>
        <Row>
          {courseContext?.state.courseList.map((course: any) =>
            course.isSelected ? (
              <Col>
                <CourseCard {...course}></CourseCard>
              </Col>
            ) : (
              <></>
            )
          )}
        </Row>
      </Container>
            */}

      <Container>
        <Accordion fluid styled>
          {courseContext?.state.courseList.map((course: any) =>
            course.isSelected ? (
              <div>
                <Accordion.Title
                  active={
                    activeIndex ===
                    courseContext.state.courseList.indexOf(course)
                  }
                  onClick={(e) => handleClick(courseContext.state.courseList.indexOf(course))}
                >
                  <Icon name="dropdown" />
                  {course.title}
                </Accordion.Title>
                <Accordion.Content
                  active={
                    activeIndex ===
                    courseContext.state.courseList.indexOf(course)
                  }
                >
                  {course.description}
                </Accordion.Content>
              </div>
            ) : (
              <></>
            )
          )}
        </Accordion>
      </Container>
      <Container>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Legg til et tiltak</Button>}
        >
          <Modal.Header>Legg til et Tiltak</Modal.Header>
          <Modal.Content>
            <SubmitCourseForm />
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Gå tilbake
            </Button>
            <Button
              content="Lagre tiltak"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Container>
    </div>
  );
};

export default MyCourses;
