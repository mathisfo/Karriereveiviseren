// TODO: change startDate and endDate from string to date
export type Category= {
  id: number;
  category: string;
}

export type CategoryContextState = {
  error: string;
  loading: boolean;
  categoryList: Array<Category>;
}

// Actions
interface IRequest {
  type: "API_REQUEST";
}

interface ISuccess {
  type: "API_SUCCESS";
  payload: Array<Category>;
}

interface IError {
  type: "API_ERROR";
  payload: string;
}

interface ISelect {
  type: "CATEGORY_SELECT";
  payload: Array<Category>;
}



export type Actions = IRequest | ISuccess | IError | ISelect;
