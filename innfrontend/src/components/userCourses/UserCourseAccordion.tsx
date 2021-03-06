import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store/store";

import { Accordion, Grid, Header, Icon, Label } from "semantic-ui-react";

import styles from "./UserCourse.module.css";
import { convertDate, setColor } from "../../utils/helpers";

const UserCourseAccordion = () => {
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const [activeIndex, setActiveIndex] = React.useState(0);

  function handleClick(index: number) {
    setActiveIndex(index);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  return (
    <div>
      <Grid padded>
        <Grid.Column>
          <Grid.Row>
            <Header as="h2" style={{ marginBottom: "1em" }}>
              INN
            </Header>
          </Grid.Row>

          <Grid.Row>
            <Accordion fluid styled>
              {courses.map((course: any) =>
                course.isSelected ? (
                  <div>
                    <Accordion.Title
                      style={{
                        fontSize: 18,
                        background: setColor(course.restriction),
                      }}
                      active={activeIndex === courses.indexOf(course) + 1}
                      onClick={(e) => handleClick(courses.indexOf(course) + 1)}
                      className={styles.wordBreak}
                      data-cy="accordionTitle"
                    >
                      <Icon name="dropdown" />
                      {course.title}
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndex === courses.indexOf(course) + 1}
                      className={styles.wordBreak}
                    >
                      <p>{course.description}</p>
                      <p>
                        <Icon name="calendar alternate outline" />
                        <b>Dato: </b>Fra {convertDate(course.startDate)} til{" "}
                        {convertDate(course.endDate)}.
                      </p>
                      <Label inverted> Spor {course.restriction} </Label>
                    </Accordion.Content>
                  </div>
                ) : (
                  <></>
                )
              )}
            </Accordion>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UserCourseAccordion;
