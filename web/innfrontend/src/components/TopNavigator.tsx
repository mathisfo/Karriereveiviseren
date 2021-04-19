import React from "react";
import { Link, NavLink, Router } from "react-router-dom";
import "../TopNavigator.css";
import Logout from "./Logout";
import { Icon, Menu } from "semantic-ui-react";

const TopNavigator = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  function resetStorage() {
    localStorage.setItem("LandingKey", "true");
    window.location.reload();
  }

  return (
    <Menu tabular>
    <Menu.Item 
      as={ Link } 
      name='Hjem' 
      to='home' 
      active={activeItem === 'home'} 
      onClick={() => setActiveItem('home')}>
  </Menu.Item>
  <Menu.Item as={ Link } name='Mine aktiviteter' to='courses' active={activeItem === 'courses'}  onClick={() => setActiveItem('courses')}>
  </Menu.Item>
  <Menu.Item as={ Link } name='Mitt introduksjonsprogram' to='progression' active={activeItem === 'progression'}  onClick={() => setActiveItem('progression')}>
  </Menu.Item>
  <Menu.Item position="right">
  <Logout />
  </Menu.Item>
    </Menu>

/*

    <Navbar bg="light" expand="lg">
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
              Mine aktiviteter
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
              Mitt introduksjonsprogram
            </NavLink>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Logout />
      </Navbar.Collapse>
    </Navbar>
    */
  );
};

export default TopNavigator;
