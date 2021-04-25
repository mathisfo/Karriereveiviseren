import React, { useState, useEffect } from "react";
import CourseCard from "../CourseCard";
import { Accordion, Checkbox, Grid, Icon, Input } from "semantic-ui-react";
import axios from "axios";
import { AppState, useAppDispatch } from "../../store/redux/store";
import { useSelector } from "react-redux";
import { courseSlice } from "../../store/slices/courseSlice";
import { categorySlice } from "../../store/slices/categorySlice";
import styles from "./CourseList.module.css";

const CourseAccordion = () => {
  const dispatch = useAppDispatch();
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const categories = useSelector(
    (state: AppState) => state.categories.categoryList
  );
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);

  const fetchCourses = async () => {
    axios.get("api/course/", { withCredentials: true }).then(
      (response) => {
        dispatch(courseSlice.actions.setCourses({ courseList: response.data }));
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fetchCategories = async () => {
    axios.get("api/category/", { withCredentials: true }).then(
      (response) => {
        dispatch(
          categorySlice.actions.setCategory({ categoryList: response.data })
        );
      },
      (error) => {
        setError(error);
      }
    );
  };

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  function filteredCourses(categoryType: number) {
    if (courses) {
      return courses
        .filter(
          (e) =>
            e.category === categoryType &&
            e.title.toLowerCase().includes(input) &&
            ((!box1 && !box2 && !box3) ||
              (e.restriction === 1 && box1) ||
              (e.restriction === 2 && box2) ||
              (e.restriction === 3 && box3))
        )
        .map((course: any) => <CourseCard {...course}></CourseCard>);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  return (
    <Grid.Column width={8}>
      <h2> Tiltak </h2>

      <Grid.Row className={styles.checkboxRow} md={2}>
        <Checkbox
          checked={box1}
          label="Spor 1"
          onClick={() => setBox1(!box1)}
          style={{ marginRight: "1em" }}
        />
        <Checkbox
          checked={box2}
          label="Spor 2"
          onClick={() => setBox2(!box2)}
          style={{ marginRight: "1em" }}
        />
        <Checkbox
          checked={box3}
          label="Spor 3"
          onClick={() => setBox3(!box3)}
          style={{ marginRight: "2em" }}
        />
        <Input
          style={{ marginBottom: "0.2em" }}
          icon="search"
          placeholder="Search..."
          onChange={(e: any) => setInput(e.target.value)}
        />
      </Grid.Row>

      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 1}
          onClick={(e) => handleClick(1)}
          style={{ fontSize: 18 }}
        >
          <Icon name="dropdown" />
          <Icon name="briefcase" />
          Arbeidsrettet {"   "}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <Grid.Row>{filteredCourses(1)}</Grid.Row>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 2}
          onClick={(e) => handleClick(2)}
          style={{ fontSize: 18 }}
        >
          <Icon name="dropdown" />
          <Icon name="graduation cap" />
          Utdanningsrettet
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <Grid.Row>{filteredCourses(2)}</Grid.Row>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 3}
          onClick={(e) => handleClick(3)}
          style={{ fontSize: 18 }}
        >
          <Icon name="dropdown" />
          <Icon name="users" />
          Samfunnsrettet
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <Grid.Row>{filteredCourses(3)}</Grid.Row>
        </Accordion.Content>
      </Accordion>
    </Grid.Column>
  );
};

export default CourseAccordion;
