import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import Course from "./components/Course";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import CourseCard from "./components/CourseCard";
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

      <Container className="p-3">
        <h1 className="header">Kursoversikt</h1>

        <Jumbotron>
          <h1>Obligatorisk</h1>
          <Container fluid>
            <Row>
              <Col>
                <CourseCard
                  title="Forkurs"
                  text="Forkurs er noe alle må gjøre"
                  modul="felles"
                />
              </Col>
              <Col>
                <CourseCard
                  title="Norskkurs"
                  text="Norskkurs lærer deg det mest basice når det kommer til norsk språk og språkutvikling, helt fra Snorre til moderne helter som TIX. Alle ungdomer må dette"
                  modul="ungdom"
                />
              </Col>
              <Col>
                <CourseCard
                  title="Karrierekompetanse"
                  text="Utvikler din kompetanse for karriere. For elever i Spor 3"
                  modul="spor3"
                />
              </Col>
              <Col>
                <CourseCard
                  title="Karrierekompetanse"
                  text="Utvikler din kompetanse for karriere. For elever i Spor 2"
                  modul="spor2"
                />
              </Col>
            </Row>
          </Container>
          <h1>Valgfrie kurs</h1>
          <Container>
            <Row>
              <Col>
                <CourseCard
                  title="Kulhetskurs"
                  text="Kurs for å bli kulere på byen. For ungdommer"
                  modul="ungdom"
                />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
