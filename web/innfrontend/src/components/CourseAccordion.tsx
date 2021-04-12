import React, { FC, useContext } from "react";
import { Accordion } from "semantic-ui-react";
import { Course } from "../store/CourseContext/types";
import { CategoryContext } from "../store/CategoryContext";

const CourseAccordion = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categoryContext = useContext(CategoryContext);

  return (
    <Accordion fluid styled>
      {categoryContext?.state.categoryList.map((category: any) => (
        <div>
          <Accordion.Title>{category.category}</Accordion.Title>
          <Accordion.Content active={activeIndex === 1}></Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
};

export default CourseAccordion;
