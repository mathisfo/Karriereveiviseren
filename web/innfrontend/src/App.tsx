import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import TopNavigator from "./components/TopNavigator";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import CourseList from "./components/courseList/";
import UserCourses from "./components/userCourses/";
import Progression from "./components/progression/";
import Timeline from "react-timeline-semantic-ui"
import { Provider, useSelector } from "react-redux";
import { AppState, store, useAppDispatch } from "./store/redux/store";
import { fetchUser, userSlice } from "./store/slices/userSlice";
import GoogleAuthLogin from "./components/GoogleAuthentication/GoogleAuthLogin";

function App() {
  const { user, isFetching, isSuccess, isError, errorMessage } = useSelector(
    (state: AppState) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(userSlice.actions.clearState());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (isError) {
      console.error(errorMessage);
      dispatch(userSlice.actions.clearState());
    }

    if (isSuccess) {
      dispatch(userSlice.actions.clearState());
    }
  }, [isError, isSuccess]);

  return (
    <>
      {!user.name && !user.email ? (
        <GoogleAuthLogin />
      ) : (
        <BrowserRouter>
          <div>
            <TopNavigator></TopNavigator>
            <Container className="p-3">
              <div>
                <Switch>
                  <Route exact path="/courses">
                    <CourseList />
                  </Route>
                  <Route exact path="/mycourses">
                    <UserCourses />
                  </Route>
                  <Route exact path="/progression">
                    <Progression />
                  </Route>
                </Switch>
              </div>
            </Container>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
