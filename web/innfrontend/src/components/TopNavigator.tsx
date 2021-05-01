import React from "react";
import { Link } from "react-router-dom";
import "../TopNavigator.css";
import { Menu } from "semantic-ui-react";
import GoogleAuthLogout from "./GoogleAuthentication/GoogleAuthLogout";
import logo from "../statics/logo_transparent_small.png"

const TopNavigator = () => {
  const [activeItem, setActiveItem] = React.useState("/");

  return (
    <Menu secondary stackable size="massive">
    <Menu.Item>
    <img src={logo} style={{width: "14em"}}></img>
    </Menu.Item>
      <Menu.Item
        as={Link}
        name="Hjem"
        to="/"
        active={activeItem === "/"}
        onClick={() => setActiveItem("/")}
      ></Menu.Item>
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
