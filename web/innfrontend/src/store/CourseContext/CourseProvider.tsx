import React, { createContext, useState, FC } from 'react';
import { Course, CourseContextState } from './types';

const contextDefaultValues: CourseContextState = {
  error: '',
  loading: false,
  courseList: [],
  apiRequest: () => {},
  apiSuccess: () => {},
  apiError: () => {},
}

export const CourseContext = createContext<CourseContextState>(contextDefaultValues);

/**
 * 
 * @param param0 Wrap around component which are to consume the CourseProvider.
 * @returns the provider component with the inherit states and hooks available through this consumer. 
 * 
 * CourseProvider provides state management through the Context API and includes all relevant functions
 * to read and update the state of courses, as well as information in regards to the API call to fetch
 * the data.
 */
const CourseProvider: FC = ({ children }) => {
  const [courseList, setCourseList] = useState<Course[]>(contextDefaultValues.courseList);
  const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading);
  const [error, setError] = useState<string>(contextDefaultValues.error);

  // I'm a bit unsure about these, confirm they are working properly
  const apiRequest = () => {
    setError(contextDefaultValues.error);
    setLoading(true);
    setCourseList(contextDefaultValues.courseList);
  }
  const apiSuccess = (courses: Array<Course>) => {
    setCourseList(courses);
    setLoading(false);
  }
  const apiError = (error: string) => {
    setError(error);
    setLoading(false);
  }

  return (
    <CourseContext.Provider value={{courseList, loading, error, apiRequest, apiSuccess, apiError,}}>
      { children }
    </CourseContext.Provider>
  );
};

export default CourseProvider;