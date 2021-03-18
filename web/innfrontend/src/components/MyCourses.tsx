import React, { useContext } from "react";
import { CourseContext } from "../store/CourseContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";

const MyCourses = () => {
    const courseContext = useContext(CourseContext);

    return (
<Container >
              <Row>
              {courseContext?.state.courseList.map((course: any) => (
                  course.isSelected ? 
                <Col>
                  <CourseCard {...course}></CourseCard>
                </Col> : <div></div>
              ))}
            </Row>
            </Container>
    )
}

export default MyCourses; 