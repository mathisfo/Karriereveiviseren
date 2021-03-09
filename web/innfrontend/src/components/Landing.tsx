import React, { FC } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface IProps {
  handleClick: () => void;
}

const Landing: FC<IProps> = (props) => {
  localStorage.setItem("LandingKey", "true");

  function handleClick() {
    localStorage.setItem("LandingKey", "false");

    props.handleClick();
    console.log("action");
  }

  return (
      <Container fluid>
      <Row>
      <Col>
      </Col>
      <Col xs={6}>
    <div>
    <h1 className="header">Logg inn</h1>
    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      Vi vil aldri dele emailen din med noen andre. Eller vil vi det? Guess you'll never know
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Husk meg" />
  </Form.Group>
  <Button variant="primary" onClick={handleClick}>
    Logg inn
  </Button>
</Form>
    </div></Col><Col></Col></Row>
    </Container>
  );
};

export default Landing;
