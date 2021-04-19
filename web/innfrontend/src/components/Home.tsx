import React, { useContext, useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { CourseContext } from "../store/CourseContext";
import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Container,
  Form,
  Grid,
  Icon,
  Input,
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
        <h2> Tiltak </h2>
        <Container>
          <Grid.Row md={2}>
            <Grid.Column>
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
            </Grid.Column>
            <Grid.Column>
              <Input icon='search' placeholder='Search...' onChange={(e: any) => setInput(e.target.value)}/>
            </Grid.Column>
          </Grid.Row>
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
            <Card.Group itemsPerRow={4}>{filteredCourses(4)}</Card.Group>
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
            <Grid.Row>{filteredCourses(5)}</Grid.Row>
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
            <Grid.Row>{filteredCourses(6)}</Grid.Row>
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
    <Home />
  </CategoryProvider>
);
