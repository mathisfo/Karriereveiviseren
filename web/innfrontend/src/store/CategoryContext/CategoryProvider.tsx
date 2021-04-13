import React, { createContext, useReducer, Dispatch } from "react";
import { CategoryContextState, Actions } from "./types";

// State
const initialState: CategoryContextState = {
  error: "",
  loading: false,
  categoryList: [],
};

// Reducer
const reducer = (
  state: CategoryContextState,
  action: Actions
): CategoryContextState => {
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
        categoryList: action.payload,
      };

    case "API_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CATEGORY_SELECT":
      return {
        ...state,
        categoryList: action.payload,
      };

    default:
      return state;
  }
};

// Context
interface IContext {
  state: CategoryContextState;
  dispatch: Dispatch<Actions>;
}

/**
 * @member state provides the CategoryContextState object stored as the context state by the provider.
 * @member dispatch provides the reducer of the context with the associated methods.
 */
export const CategoryContext = createContext<IContext | null>(null);

/**
 *
 * @param param0 Wrap around component which are to consume the CategoryProvider.
 * @returns the provider component with the inherit states and hooks available through this consumer.
 *
 * CategoryProvider provides state management through the Context API and includes all relevant functions
 * to read and update the state of Categorys, as well as information in regards to the API call to fetch
 * the data.
 */
const CategoryContextProvider = ({ children }: { children: JSX.Element }) => {
  const { Provider } = CategoryContext;
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default CategoryContextProvider;

// Why is the code this way?
// https://stackoverflow.com/questions/65836693/unable-to-pass-objects-state-and-dispatch-to-provider-when-using-createcontext-a
// It's unfortunate, but as of right now there is no going around having conditional checks on whether Context is null or not.
