import React, { useContext, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "../CourseCard";
import { CourseContext } from "../../store/CourseContext";
import { FormControl, InputGroup } from "react-bootstrap";
import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Icon,
} from "semantic-ui-react";
import CategoryProvider, { CategoryContext } from "../../store/CategoryContext";
import MyCourses from "../myCourses/UserCoursesAccordion";
import axios from "axios";

const CoursesAccordion = () => {
  const courseContext = useContext(CourseContext);
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categoryContext = useContext(CategoryContext);

  useEffect(() => {
    // Need conditional render because of possible null in courseContext
    // Have not found a fix for this if we are going with the reducer instead of state
    categoryContext?.dispatch({ type: "API_REQUEST" });
    axios.get("http://localhost:8000/api/category/", { withCredentials: true }).then(
      (result: any) => {
        console.log(result);
        categoryContext?.dispatch({
          type: "API_SUCCESS",
          payload: result.data,
        });
      },
      (error) => {
        categoryContext?.dispatch({ type: "API_ERROR", payload: error });
      }
    );
  }, []);

  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  function filteredCourses(categoryType: string) {
    return courseContext?.state.courseList
      .filter(
        (e) =>
          e.category === categoryType &&
          e.title.toLowerCase().includes(input) &&
          ((!box1 && !box2 && !box3) ||
            (e.restriction === 1 && box1) ||
            (e.restriction === 2 && box2) ||
            (e.restriction === 3 && box3))
      )
      .map((course: any) => <CourseCard {...course}></CourseCard>);
  }

  console.log(courseContext);

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
    <Grid columns={2} relaxed="very">
      <Grid.Column>
        <h2> Tiltak </h2>
        <Container>
          <Row md={2}>
            <Col>
              <Checkbox
                checked={box1}
                label="Spor 1"
                onClick={() => setBox1(!box1)}
                style={{ marginRight: "1em" }}
              />
              <Checkbox
                checked={box2}
                label="Spor 2"
                onClick={() => setBox2(!box2)}
                style={{ marginRight: "1em" }}
              />
              <Checkbox
                checked={box3}
                label="Spor 3"
                onClick={() => setBox3(!box3)}
                style={{ marginRight: "2em" }}
              />
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Søk..."
                  onChange={(e) => setInput(e.target.value)}
                />
                <InputGroup.Append>
                  <Button primary size="tiny">
                    <Icon name="search"></Icon>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndex === 1}
            onClick={(e) => handleClick(1)}
            style={{ fontSize: 18 }}
          >
            <Icon name="dropdown" />
            <Icon name="briefcase" />
            Arbeidsrettet {"   "}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Card.Group itemsPerRow={4}>
              {filteredCourses("Arbeidsrettet")}
            </Card.Group>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 2}
            onClick={(e) => handleClick(2)}
            style={{ fontSize: 18 }}
          >
            <Icon name="dropdown" />
            <Icon name="graduation cap" />
            Utdanningsrettet
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Row>{filteredCourses("Utdanningsrettet")}</Row>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 3}
            onClick={(e) => handleClick(3)}
            style={{ fontSize: 18 }}
          >
            <Icon name="dropdown" />
            <Icon name="users" />
            Samfunnsrettet
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <Row>{filteredCourses("Samfunnsrettet")}</Row>
          </Accordion.Content>
        </Accordion>
      </Grid.Column>
      <Grid.Column>
        <h2> Valgte tiltak </h2>
        <MyCourses />
      </Grid.Column>
    </Grid>
  );
};

export default () => (
  <CategoryProvider>
    <CoursesAccordion />
  </CategoryProvider>
);
