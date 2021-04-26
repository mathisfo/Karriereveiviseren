import React from "react";
import { Link, NavLink, Router } from "react-router-dom";
import "../TopNavigator.css";
import { Grid, Icon, Menu } from "semantic-ui-react";
import GoogleAuthLogout from "./GoogleAuthentication/GoogleAuthLogout";

const TopNavigator = () => {
  const [activeItem, setActiveItem] = React.useState("courses");

  return (
    <Menu tabular stackable data-cy="Navbar">
      <Menu.Item
        as={Link}
        name="Aktiviteter"
        to="courses"
        active={activeItem === "courses"}
        onClick={() => setActiveItem("courses")}
        data-cy="homeLink"
      ></Menu.Item>
      <Menu.Item
        as={Link}
        name="Mine aktiviteter"
        to="mycourses"
        active={activeItem === "mycourses"}
        onClick={() => setActiveItem("mycourses")}
        data-cy="coursesLink"
      ></Menu.Item>
      <Menu.Item
        as={Link}
        name="Mitt introduksjonsprogram"
        to="progression"
        active={activeItem === "progression"}
        onClick={() => setActiveItem("progression")}
      ></Menu.Item>
      <GoogleAuthLogout />
    </Menu>
  );
};

export default TopNavigator;
