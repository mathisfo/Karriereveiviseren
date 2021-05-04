import { Course } from "../interfaces/Course";

export type CourseState = {
  courseList: Array<Course>;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};
