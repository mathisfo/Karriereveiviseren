export type Course = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  restriction: number;
};

export type CourseContextState = {
  error: string;
  loading: boolean;
  courseList: Array<Course>;
};
