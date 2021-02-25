import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import Course from "./components/Course";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import TopNavigator from "./components/TopNavigator";

function App() {
  return (
    <div>
      <TopNavigator></TopNavigator>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">INN01</h1>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
