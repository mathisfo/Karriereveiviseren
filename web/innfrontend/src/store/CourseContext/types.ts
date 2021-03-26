<<<<<<< HEAD
// TODO: change startDate and endDate from string to date
=======
// Course
>>>>>>> d47d27a01da45a674baea05401db63ad6ef7816f
export type Course = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  restriction: number;
  isSelected: boolean;
};

// Course Context
export type CourseContextState = {
  error: string;
  loading: boolean;
  courseList: Array<Course>;
};

// Actions
interface IRequest {
  type: "API_REQUEST";
}

interface ISuccess {
  type: "API_SUCCESS";
  payload: Array<Course>;
}

interface IError {
  type: "API_ERROR";
  payload: string;
}

interface ISelect {
  type: "COURSE_SELECT";
  payload: Array<Course>;
}

export type Actions = IRequest | ISuccess | IError | ISelect;
