import { User } from "../interfaces/User";

export type UserState = {
  user: User;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};
