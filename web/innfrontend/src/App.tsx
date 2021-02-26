import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import Course from "./components/Course";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import CourseCard from "./components/CourseCard";
import TopNavigator from "./components/TopNavigator";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/course/")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCourses(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  console.log(courses);

  return (
    <div>
      <TopNavigator />

      <Container className="p-3">
        <h1 className="header">Kursoversikt</h1>
        <Row>
          {courses.map((course: any) => (
            <Col>
              <CourseCard {...course}></CourseCard>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
