import React from "react";
import Container from "react-bootstrap/Container";
import { Accordion, Icon, Label } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { AppState } from "../store/redux/store";

const MyCourses = () => {
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const [activeIndex, setActiveIndex] = React.useState(0);
  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }


  return (
    <div>
      <Container>
        <Accordion fluid styled>
          {courses.map((course: any) =>
            course.isSelected ? (
              <div>
                <Accordion.Title
                  active={
                    activeIndex ===
                    courses.indexOf(course.title)
                  }
                  onClick={(e) => handleClick(1)}
                >
                  <Icon name="dropdown" />
                  {course.title}
                </Accordion.Title>
                <Accordion.Content
                  active={
                    activeIndex ===
                    courses.indexOf(course.title)
                  }
                >
                  {course.description}

                </Accordion.Content>
              </div>
            ) : (
              <></>
            )
          )}
        </Accordion>
      </Container>
    </div>
  );
};

export default MyCourses;
