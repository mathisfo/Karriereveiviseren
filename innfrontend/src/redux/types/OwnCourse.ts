export interface OwnCourse {
  id: number;
  title: string;
  user: number;
  startDate: string;
  endDate: string;
  description: string;
  shortDescription: string;
  goal: string;
  url: string;
}

export type OwnCourseState = {
  ownCourseList: Array<OwnCourse>;
};
