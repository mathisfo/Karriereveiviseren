import React, { useState, useEffect } from "react";
import CourseCard from "../CourseCard";
import { Accordion, Checkbox, Grid, Icon, Input, Label } from "semantic-ui-react";
import axios from "axios";
import { AppState, useAppDispatch } from "../../store/redux/store";
import { useSelector } from "react-redux";
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
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <h2> Velg aktiviteter </h2>
      </Grid.Row>
      <Grid.Row style= {{marginBottom: "1em"}}>
        <Grid.Row className={styles.checkboxRow} md={2}>
        <Label style={{height: "2.3em", marginRight: "2em", background: "#cfe1b9"}}>
      <Checkbox
            checked={box1}
            onClick={() => setBox1(!box1)}
          />
    </Label>
    <Label style={{height: "2.3em", marginRight: "2em", background: "#ffc971"}}>
      <Checkbox
            checked={box2}
            onClick={() => setBox2(!box2)}
          />
    </Label>
    <Label style={{height: "2.3em", marginRight: "2em", background: "#e28080"}}>
      <Checkbox
            checked={box1}
            onClick={() => setBox3(!box3)}
          />
    </Label>
          <Input
            icon="search"
            placeholder="Search..."
            onChange={(e: any) => setInput(e.target.value)}
          />
        </Grid.Row>
      </Grid.Row>
      <Grid.Row>
        <Accordion fluid styled>
          {categories.map((category) => (
            <div>
              <Accordion.Title
                active={activeIndex === category.id}
                onClick={(e) => handleClick(categories.indexOf(category) + 1)}
                style={{ fontSize: 18 }}
              >
                <Icon name="dropdown" />
                <Icon name={category.icon} />
                {category.category}
              </Accordion.Title>
              <Accordion.Content
                active={activeIndex === categories.indexOf(category) + 1}
              >
                <Grid.Row>{filteredCourses(category.id)}</Grid.Row>
              </Accordion.Content>
            </div>
          ))}
        </Accordion>
      </Grid.Row>
    </Grid>
  );
};

export default CourseAccordion;
