import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Accordion, Grid } from "semantic-ui-react";
import { AppState } from "../store/redux/store";
import CourseCard from "./CourseCard";


interface IProps {
  courseList: any
}

const CourseAccordion:FC<IProps> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categories = useSelector(
    (state: AppState) => state.categories.categoryList
  );

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }


  return (
    <Accordion fluid styled>
      {categories.map((category: any) => (
        <div>
          <Accordion.Title onClick={(e) => handleClick(categories.indexOf(category))}>{category.category}</Accordion.Title>
          <Accordion.Content active={activeIndex === categories.indexOf(category)} >
          <Grid.Row>{props.courseList
            .map((course: any) =>(
            <Grid.Column>
            <CourseCard {...course}></CourseCard>
            </Grid.Column>
          ))}</Grid.Row>
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default CourseAccordion;
