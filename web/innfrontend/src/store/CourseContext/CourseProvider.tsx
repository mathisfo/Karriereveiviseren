import React, { createContext, useReducer, Dispatch } from "react";
import { CourseContextState, Actions } from "./types";

// State
const initialState: CourseContextState = {
  error: "",
  loading: false,
  courseList: [],
};

// Reducer
const reducer = (
  state: CourseContextState,
  action: Actions
): CourseContextState => {
  switch (action.type) {
    case "API_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "API_SUCCESS":
      return {
        ...state,
        loading: false,
        courseList: action.payload,
      };

    case "API_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "COURSE_SELECT":
      return {
        ...state,
        courseList: action.payload,
      };

    default:
      return state;
  }
};

// Context
interface IContext {
  state: CourseContextState;
  dispatch: Dispatch<Actions>;
}

/**
 * @member state provides the CourseContextState object stored as the context state by the provider.
 * @member dispatch provides the reducer of the context with the associated methods.
 */
export const CourseContext = createContext<IContext | null>(null);

/**
 *
 * @param param0 Wrap around component which are to consume the CourseProvider.
 * @returns the provider component with the inherit states and hooks available through this consumer.
 *
 * CourseProvider provides state management through the Context API and includes all relevant functions
 * to read and update the state of courses, as well as information in regards to the API call to fetch
 * the data.
 */
const CourseContextProvider = ({ children }: { children: JSX.Element }) => {
  const { Provider } = CourseContext;
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default CourseContextProvider;

// Why is the code this way?
// https://stackoverflow.com/questions/65836693/unable-to-pass-objects-state-and-dispatch-to-provider-when-using-createcontext-a
// It's unfortunate, but as of right now there is no going around having conditional checks on whether Context is null or not.
