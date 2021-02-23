import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import Course from "./components/Course";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function App() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <p>Yeet</p>
      </Alert>
    );
  }
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">INN01</h1>
      </Jumbotron>
      <Button variant="outline-primary" onClick={() => setShow(true)}>
        Knapp
      </Button>
    </Container>
  );
}

export default App;
