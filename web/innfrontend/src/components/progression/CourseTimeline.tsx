import React from "react";
import { useSelector } from "react-redux";
import Timeline from "react-timeline-semantic-ui";
import { Container, Icon } from "semantic-ui-react";
import { Course } from "../../store/interfaces/Course";
import { AppState } from "../../store/redux/store";

const CourseTimeline = () => {
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const monthNames = [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember",
  ];

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

  function convertTime(time: string) {
    return (
      time.slice(8, 10) +
      "." +
      " " +
      monthNames[Number(time.slice(5, 7))] +
      " " +
      time.slice(0, 4)
    );
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

  return (
    <Container>
      {courses
        .filter((course) => course.isSelected)
        .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
        .map((course: any, index: number) => (
          <Timeline
            direction={cardDirection(index)}
            icon={setIcon(course.category)}
            title={course.title}
            time={convertTime(course.startDate)}
            description={course.shortDescription}
            color={setColor(course.restriction)}
            tags={["Spor " + course.restriction.toString()]}
            lineHeight={4}
          />
        ))}
    </Container>
  );
};

export default CourseTimeline;
