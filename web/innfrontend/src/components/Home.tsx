import React, { useContext, useState, Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import { CourseContext } from "../store/CourseContext";
import Progression from "./Progression";
import { Button, Dropdown, FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Accordion, Icon } from "semantic-ui-react";



const Home = () => {
  const courseContext = useContext(CourseContext);
  const [selectedRestriction, setSelectedRestriction] = React.useState("");
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);


  function handleClick(index: number) {
    setActiveIndex(index)
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex( newIndex )
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
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedRestriction}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setSelectedRestriction("Spor 1")}
                  >
                    Spor 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setSelectedRestriction("Spor 2")}
                  >
                    Spor 2
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setSelectedRestriction("Spor 3")}
                  >
                    Spor 3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
            Arbeidsrettet
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Row>
              {courseContext?.state.courseList
                .filter(
                  (e) =>
                    // TODO: This filter is not intuitive in the long run if we filter on several conditions in the future. This works as a proof of concept. We should check out prewritten react filters
                    e.category === "Arbeidsrettet" &&
                    ((e.restriction === 1 &&
                      selectedRestriction === "Spor 1" &&
                      e.title.toLowerCase().includes(input)) ||
                      (e.restriction === 2 &&
                        selectedRestriction === "Spor 2" &&
                        e.title.toLowerCase().includes(input)) ||
                      (e.restriction === 3 &&
                        selectedRestriction === "Spor 3" &&
                        e.title.toLowerCase().includes(input)) ||
                      (e.title.toLowerCase().includes(input) &&
                        selectedRestriction === ""))
                )
                .map((course: any) => (
                  <Col>
                    <CourseCard {...course}></CourseCard>
                  </Col>
                ))}
            </Row>
          </Accordion.Content>
          <Accordion.Title
          active={activeIndex === 2}
          onClick={(e) => handleClick(2)}
          >
            <Icon name="dropdown" />
            Utdanningsrettet
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Row>
              {courseContext?.state.courseList
                .filter(
                  (e) =>
                    // TODO: This filter is not intuitive in the long run if we filter on several conditions in the future. This works as a proof of concept. We should check out prewritten react filters
                    e.category === "Utdanningsrettet" &&
                    ((e.restriction === 1 &&
                      selectedRestriction === "Spor 1" &&
                      e.title.toLowerCase().includes(input)) ||
                      (e.restriction === 2 &&
                        selectedRestriction === "Spor 2" &&
                        e.title.toLowerCase().includes(input)) ||
                      (e.restriction === 3 &&
                        selectedRestriction === "Spor 3" &&
                        e.title.toLowerCase().includes(input)) ||
                      (e.title.toLowerCase().includes(input) &&
                        selectedRestriction === ""))
                )
                .map((course: any) => (
                  <Col>
                    <CourseCard {...course}></CourseCard>
                  </Col>
                ))}
            </Row>
          </Accordion.Content>
          <Accordion.Title
          active={activeIndex === 3}
          onClick={(e) => handleClick(3)}
          >
            <Icon name="dropdown" />
            Samfunnsrettet
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <Row>
              {courseContext?.state.courseList
                .filter(
                  (e) =>
                    // TODO: This filter is not intuitive in the long run if we filter on several conditions in the future. This works as a proof of concept. We should check out prewritten react filters
                    e.category === "Samfunnsrettet" &&
                    ((e.restriction === 1 &&
                      selectedRestriction === "Spor 1" &&
                      e.title.toLowerCase().includes(input)) ||
                      (e.restriction === 2 &&
                        selectedRestriction === "Spor 2" &&
                        e.title.toLowerCase().includes(input)) ||
                      (e.restriction === 3 &&
                        selectedRestriction === "Spor 3" &&
                        e.title.toLowerCase().includes(input)) ||
                      (e.title.toLowerCase().includes(input) &&
                        selectedRestriction === ""))
                )
                .map((course: any) => (
                  <Col>
                    <CourseCard {...course}></CourseCard>
                  </Col>
                ))}
            </Row>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
};

export default Home;