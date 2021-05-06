export interface User {
  name: string;
  email: string;
  id: number;
}

export type UserState = {
  user: User;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};
