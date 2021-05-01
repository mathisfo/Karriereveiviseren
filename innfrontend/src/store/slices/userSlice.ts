import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "../types/UserState";

type APIUser = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  pk: number;
};

type APITokens = {
  refresh_token: string | null,
  access_token: string | null,
}

type FetchUserError = {
  message: string;
};

export const fetchUser = createAsyncThunk<
  APIUser,
  APITokens,
  { rejectValue: FetchUserError }
>("users/fetch", async (tokens, thunkAPI) => {
  let response = await axios.get("dj-rest-auth/user/", {
    headers: {
      "access_token": tokens.access_token,
      "refresh_token": tokens.refresh_token,
    },
    withCredentials: true,
  });
  let result = await response.data;
  if (response.status != 200) {
    return thunkAPI.rejectWithValue(result);
  }
  return result;
});

export const loginUser = createAsyncThunk<
  APIUser,
  string,
  { rejectValue: FetchUserError }
>("users/login", async (accesstoken: string, thunkAPI) => {
  let response = await axios.post(
    "login/",
    {
      access_token: accesstoken,
    },
    { withCredentials: true }
  );
  let result = await response.data;
  if (response.status != 200) {
    return thunkAPI.rejectWithValue(result);
  }
  localStorage.setItem("access_token", accesstoken);
  localStorage.setItem("refresh_token", result.refresh_token);
  return result.user;
});

export const logoutUser = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: FetchUserError }
>("users/logout", async (undefined, thunkAPI) => {
  let response = await axios.post(
    "dj-rest-auth/logout/",
    {},
    { withCredentials: true }
  );
  let result = await response.data;
  if (response.status != 200) {
    return thunkAPI.rejectWithValue(result);
  }
  return result;
});

export const userSlice = createSlice({
  name: "user-slice",
  initialState: {
    user: { name: "", email: "" },
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  } as UserState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user.email = payload.email;
      state.user.name = payload.first_name;
      state.user.id = payload.pk;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      if (payload) console.error(payload);
      state.isFetching = false;
      state.isError = true;
      if (payload) state.errorMessage = payload.message;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user.email = "";
      state.user.name = "";
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.reload();
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      if (payload) console.error(payload);
      state.isFetching = false;
      state.isError = true;
      if (payload) state.errorMessage = payload.message;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user.email = payload.email;
      state.user.name = payload.first_name;
      state.user.id = payload.pk;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      if (payload) console.error(payload);
      state.isFetching = false;
      state.isError = true;
      if (payload) state.errorMessage = payload.message;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.isFetching = true;
    });
  },
});
