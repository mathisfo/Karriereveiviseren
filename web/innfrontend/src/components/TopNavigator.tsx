import React from "react";
import { Link, NavLink, Router } from "react-router-dom";
import "../TopNavigator.css";
import { Grid, Icon, Menu } from "semantic-ui-react";

const TopNavigator = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  return (
    <Menu tabular stackable>
      <Menu.Item
        as={Link}
        name="Hjem"
        to="home"
        active={activeItem === "home"}
        onClick={() => setActiveItem("home")}
      ></Menu.Item>
      <Menu.Item
        as={Link}
        name="Mine aktiviteter"
        to="courses"
        active={activeItem === "courses"}
        onClick={() => setActiveItem("courses")}
      ></Menu.Item>
      <Menu.Item
        as={Link}
        name="Mitt introduksjonsprogram"
        to="progression"
        active={activeItem === "progression"}
        onClick={() => setActiveItem("progression")}
      ></Menu.Item>
      
    </Menu>
  );
};

export default TopNavigator;
