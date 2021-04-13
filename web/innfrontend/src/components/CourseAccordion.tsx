import React, { FC, useContext } from "react";
import { Accordion } from "semantic-ui-react";
import { Course } from "../store/CourseContext/types";
import { CategoryContext } from "../store/CategoryContext";
import { Row, Col } from "react-bootstrap";
import CourseCard from "./CourseCard";

interface IProps {
  courseList: any
}

const CourseAccordion:FC<IProps> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categoryContext = useContext(CategoryContext);

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }


  return (
    <Accordion fluid styled>
      {categoryContext?.state.categoryList.map((category: any) => (
        <div>
          <Accordion.Title onClick={(e) => handleClick(categoryContext?.state.categoryList.indexOf(category))}>{category.category}</Accordion.Title>
          <Accordion.Content active={activeIndex === categoryContext?.state.categoryList.indexOf(category)} >
          <Row>{props.courseList
            .map((course: any) =>(
            <Col>
            <CourseCard {...course}></CourseCard>
            </Col>
          ))}</Row>
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default CourseAccordion;
