import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import { CourseContext } from "../store/CourseContext";

const Home = () => {
  const courseContext = useContext(CourseContext);

  return (
    <Container>
      <Row>
        {courseContext?.state.courseList.map((course: any) => (
          <Col>
            <CourseCard {...course}></CourseCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
