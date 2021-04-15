import React, { useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import { CourseContext } from "../store/CourseContext";
import axios from "axios";

const Home = () => {
  const courseContext = useContext(CourseContext);

  useEffect(() => {
    // Need conditional render because of possible null in courseContext
    // Have not found a fix for this if we are going with the reducer instead of state
    courseContext?.dispatch({ type: "API_REQUEST" });
    axios
      .get("http://localhost:8000/api/course/", { withCredentials: true })
      .then(
        (result: any) => {
          console.log(result);
          courseContext?.dispatch({
            type: "API_SUCCESS",
            payload: result.data,
          });
        },
        (error) => {
          courseContext?.dispatch({ type: "API_ERROR", payload: error });
        }
      );
  }, []);

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
