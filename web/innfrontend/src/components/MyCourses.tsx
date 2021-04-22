import React from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { AppState } from "../store/redux/store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import {
  Accordion,
  Button,
  Header,
  Icon,
  Label,
  Modal,
} from "semantic-ui-react";
import SubmitCourseForm from "./SubmitCourseForm";

const MyCourses = () => {
  const courses = useSelector((state: AppState) => state.courses.courseList);
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
        <Accordion fluid styled >
          {courses.map((course: any) =>
            course.isSelected ? (
              <div>
                <Accordion.Title
                  active={
                    activeIndex ===
                    courses.indexOf(course.title)
                  }
                  onClick={(e) => handleClick(1)}
                  data-cy="accordion"
                >
                  <Icon name="dropdown" />
                  {course.title}
                </Accordion.Title>
                <Accordion.Content
                  active={
                    activeIndex ===
                    courses.indexOf(course.title)
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
          trigger={<Button data-cy="addButton">Legg til et tiltak</Button>}
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
