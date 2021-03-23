// TODO: change startDate and endDate from string to date
export type Course = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  restriction: number;
  isSelected: boolean;
};

export type CourseContextState = {
  error: string;
  loading: boolean;
  courseList: Array<Course>;
};
