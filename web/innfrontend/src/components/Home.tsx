import React, { useContext, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import { CourseContext } from "../store/CourseContext";
import { FormControl, InputGroup } from "react-bootstrap";
import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import CategoryProvider, { CategoryContext } from "../store/CategoryContext/";
import MyCourses from "./MyCourses";
import axios from "axios";

const Home = () => {
  const courseContext = useContext(CourseContext);
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  function filteredCourses(categoryType: number) {
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

  return (
    <Grid columns={2} relaxed="very">
      <Grid.Column>
        <h2> Velg Aktiviter </h2>
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
        <Segment>
          <Header as="h2">Arbeidsrettet</Header>
          <Divider clearing />
          {filteredCourses(4)}
        </Segment>
        <Segment>
          <Header as="h2">Utdanningsrettet</Header>
          <Divider clearing />
          {filteredCourses(5)}
        </Segment>
        <Segment>
          <Header as="h2">Samfunnsrettet</Header>
          <Divider clearing />
          {filteredCourses(6)}
        </Segment>
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
    <Home />
  </CategoryProvider>
);
