import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../statics/imdi-logo.svg";
import { PersonCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { Link, Router } from "react-router-dom";


const TopNavigator = () => {

  function resetStorage() {
    localStorage.setItem("LandingKey", "true");
    window.location.reload();
  }

  return (
    <Navbar bg="light" expand="lg">
      <img src={logo}></img>
      <Navbar.Brand href="#home">INN</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
    
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button onClick={resetStorage}>
          <PersonCircle></PersonCircle> Logg ut
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavigator;

