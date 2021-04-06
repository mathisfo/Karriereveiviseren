import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";
import { CourseContext } from "../store/CourseContext";
import Progression from "./Progression";
import { Button, Dropdown, FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const Home = () => {
  const courseContext = useContext(CourseContext);
  const [selectedRestriction, setSelectedRestriction] = React.useState(0);
  const [input, setInput] = useState("");


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
        Spor
    </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item onClick={(() => setSelectedRestriction(1))}>Spor 1</Dropdown.Item>
        <Dropdown.Item onClick={(() => setSelectedRestriction(2))}>Spor 2</Dropdown.Item>
        <Dropdown.Item onClick={(() => setSelectedRestriction(3))}>Spor 3</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown></Col> 
<Col>
<InputGroup className="mb-3">
<FormControl
  placeholder="Søk..."
  aria-label="Recipient's username"
  aria-describedby="basic-addon2"
  onChange={(e) => setInput(e.target.value)}
/>
<InputGroup.Append>
  <Button><Search></Search></Button>
</InputGroup.Append>
</InputGroup></Col>
</Row>

</Container>
      <Row>
        {courseContext?.state.courseList
          .filter(
          (e) =>
          // TODO: This filter is not intuitive in the long run if we filter on several conditions in the future. This works as a proof of concept. We should check out prewritten react filters
          ((e.restriction === 1 && selectedRestriction === 1 && (e.title.toLowerCase().includes(input))) || (e.restriction === 2 && selectedRestriction === 2 && (e.title.toLowerCase().includes(input))) || (e.restriction === 3 && selectedRestriction === 3 && (e.title.toLowerCase().includes(input))) || ((e.title.toLowerCase().includes(input)) && selectedRestriction === 0)) 
        )
        .map((course: any) => (
          <Col>
            <CourseCard {...course}></CourseCard>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default Home;
