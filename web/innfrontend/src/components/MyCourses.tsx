import React, { useContext, useState } from "react";
import { CourseContext } from "../store/CourseContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import { Accordion, Icon, Label } from "semantic-ui-react";

const MyCourses = () => {
  const courseContext = useContext(CourseContext);
  const [activeIndex, setActiveIndex] = React.useState(0);
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
                    courseContext.state.courseList.indexOf(course.title)
                  }
                  onClick={(e) => handleClick(1)}
                >
                  <Icon name="dropdown" />
                  {course.title}
                </Accordion.Title>
                <Accordion.Content
                  active={
                    activeIndex ===
                    courseContext.state.courseList.indexOf(course.title)
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
    </div>
  );
};

export default MyCourses;
