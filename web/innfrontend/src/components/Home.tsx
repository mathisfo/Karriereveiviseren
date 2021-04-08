import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import { CourseContext } from "../store/CourseContext";

const Home = () => {
  const courseContext = useContext(CourseContext);

  console.log(courseContext);

  return (
    <Container>
      <Row>
        { courseContext?.state.courseList.length ? courseContext?.state.courseList.map((course: any) => (
          <Col>
            <CourseCard {...course}></CourseCard>
          </Col>
        )) : <p>No stuff here</p>}
      </Row>
    </Container>
  );
};

export default Home;
