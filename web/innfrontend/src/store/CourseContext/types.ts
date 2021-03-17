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
  apiRequest: () => void;
  apiSuccess: (courses: Array<Course>) => void;
  apiError: (error: string) => void;
};
