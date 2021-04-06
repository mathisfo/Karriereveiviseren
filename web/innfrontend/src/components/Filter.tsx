import React, { Component, FC, useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { CourseContext } from "../store/CourseContext";
import { Course } from "../store/CourseContext/types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./CourseCard";


  
const Filter =  () => {



    return (
        <div>
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Spor
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item value={1}>Spor 1</Dropdown.Item>
            <Dropdown.Item value={2}>Spor 2</Dropdown.Item>
            <Dropdown.Item value={3}>Spor 3</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown> 

    </div>
)
}

export default Filter;