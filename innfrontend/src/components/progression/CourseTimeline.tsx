import React from "react";
import { useSelector } from "react-redux";
import Timeline from "react-timeline-semantic-ui";
import { Container, Grid, Header } from "semantic-ui-react";
import { Course } from "../../store/interfaces/Course";
import { AppState } from "../../store/redux/store";
import { convertDate } from "../Helpers"

const CourseTimeline = () => {
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const owncourses = useSelector(
    (state: AppState) => state.owncourses.ownCourseList
  );

  const filteredCourses = courses.filter((course) => course.isSelected);

  const allCourses = [...filteredCourses, ...owncourses];

  function cardDirection(courseid: number) {
    if (courseid % 2 === 0) {
      return "right";
    } else {
      return "left";
    }
  }

  function setColor(modul?: number) {
    switch (modul) {
      case 1:
        return "yellow";
      case 2:
        return "green";
      case 3:
        return "red";
      default:
        return "teal";
    }
  }

  function setIcon(icon: number) {
    switch (icon) {
      case 1: {
        return "users";
      }
      case 3: {
        return "graduation cap";
      }
      case 2: {
        return "briefcase";
      }
      default: {
        return "user";
      }
    }
  }

  function setTag(course: Course) {
    if (course.restriction) {
      return ["Spor " + course.restriction];
    } else {
      return ["Egendefinert"];
    }
  }

  return (
    <Container>
      <Grid.Row>
      <Header as="h2" style={{marginBottom: "5em"}}>Mitt introduksjonsprogram</Header>
      </Grid.Row>
      {allCourses
        .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
        .map((course: any, index: number) => (
          <Timeline
            direction={cardDirection(index)}
            icon={setIcon(course.category)}
            title={course.title}
            time={convertDate(course.startDate)}
            description={
              course.shortDescription +
              ".   Fra " +
              convertDate(course.startDate) +
              " til " +
              convertDate(course.endDate)
            }
            color={setColor(course.restriction)}
            tags={setTag(course)}
            lineHeight={allCourses.length+1}
          />
        ))}
    </Container>
  );
};

export default CourseTimeline;
