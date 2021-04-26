import React from "react";
import { Link, NavLink, Router } from "react-router-dom";
import "../TopNavigator.css";
import { Grid, Icon, Menu } from "semantic-ui-react";
import GoogleAuthLogout from "./GoogleAuthentication/GoogleAuthLogout";

const TopNavigator = () => {
  const [activeItem, setActiveItem] = React.useState("courses");

  return (
    <Menu tabular stackable>
      <Menu.Item
        as={Link}
        name="Aktiviteter"
        to="courses"
        active={activeItem === "courses"}
        onClick={() => setActiveItem("courses")}
      ></Menu.Item>
      <Menu.Item
        as={Link}
        name="Mine aktiviteter"
        to="mycourses"
        active={activeItem === "mycourses"}
        onClick={() => setActiveItem("mycourses")}
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
