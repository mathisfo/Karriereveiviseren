import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../statics/imdi-logo.svg";
import { PersonCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { Link, NavLink, Router } from "react-router-dom";
import "../TopNavigator.css";

const TopNavigator = () => {
  function resetStorage() {
    localStorage.setItem("LandingKey", "true");
    window.location.reload();
  }

  return (
    <Navbar bg="light" expand="lg">
      <img src={logo}></img>
      <Navbar.Brand>INN</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Text>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/home"
              activeStyle={{
                fontWeight: "bold",
              }}
              exact
            >
              Hjem
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/courses"
              activeStyle={{
                fontWeight: "bold",
              }}
              exact
            >
              Mine tiltak
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/progression"
              activeStyle={{
                fontWeight: "bold",
              }}
              exact
            >
              Progresjon
            </NavLink>
          </Navbar.Text>
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
