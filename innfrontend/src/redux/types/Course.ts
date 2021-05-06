export interface Course {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  shortDescription: string;
  restriction: number;
  isSelected: boolean;
  category: number;
  classroom: string;
  url: string;
}

export type CourseState = {
  courseList: Array<Course>;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};
