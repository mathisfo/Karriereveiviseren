import React, { useContext, useState, Component, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import { CourseContext } from "../store/CourseContext";
import Progression from "./Progression";
import { Button, Dropdown, FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Accordion, Checkbox, Icon } from "semantic-ui-react";
import CategoryProvider, { CategoryContext } from "../store/CategoryContext/";
import CategoryAccordion from "./CourseAccordion";

const Home = () => {
  const courseContext = useContext(CourseContext);
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categoryContext = useContext(CategoryContext);

  useEffect(() => {
    // Need conditional render because of possible null in courseContext
    // Have not found a fix for this if we are going with the reducer instead of state
    categoryContext?.dispatch({ type: "API_REQUEST" });
    fetch("http://127.0.0.1:8000/api/category/")
      .then((res) => res.json())
      .then(
        (result) => {
          categoryContext?.dispatch({ type: "API_SUCCESS", payload: result });
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
      .map((course: any) => (
        <Col>
          <CourseCard {...course}></CourseCard>
        </Col>
      ));
  }

  return (
    <div>
      <h2>Mitt introduksjonsprogram </h2>
      <Container>
        <Progression />
      </Container>
      <Container>
        <h2> Tiltak </h2>
        <Container>
          <Row md={2}>
            <Col>
              <Checkbox
                checked={box1}
                label="Spor 1"
                onClick={() => setBox1(!box1)}
              />
              <Checkbox
                checked={box2}
                label="Spor 2"
                onClick={() => setBox2(!box2)}
              />
              <Checkbox
                checked={box3}
                label="Spor 3"
                onClick={() => setBox3(!box3)}
              />
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Søk..."
                  onChange={(e) => setInput(e.target.value)}
                />
                <InputGroup.Append>
                  <Button>
                    <Search></Search>
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
          >
            <Icon name="dropdown" />
            Arbeidsrettet {"   "}
            <Icon name="briefcase" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Row>{filteredCourses("Arbeidsrettet")}</Row>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 2}
            onClick={(e) => handleClick(2)}
          >
            <Icon name="dropdown" />
            Utdanningsrettet <Icon name="graduation cap" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Row>{filteredCourses("Utdanningsrettet")}</Row>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 3}
            onClick={(e) => handleClick(3)}
          >
            <Icon name="dropdown" />
            Samfunnsrettet <Icon name="users" />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <Row>{filteredCourses("Samfunnsrettet")}</Row>
          </Accordion.Content>
        </Accordion>
        <CategoryAccordion />
      </Container>
    </div>
  );
};

export default () => (
  <CategoryProvider>
    <Home />
  </CategoryProvider>
);
