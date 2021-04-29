import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import TopNavigator from "./components/TopNavigator";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import CourseList from "./components/courseList/";
import UserCourses from "./components/userCourses/";
import Progression from "./components/progression/";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "./store/redux/store";
import { fetchUser, userSlice } from "./store/slices/userSlice";
import GoogleAuthLogin from "./components/GoogleAuthentication/GoogleAuthLogin";
import Home from "./components/home";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  library.add(fas, fab);

  const { user, isSuccess, isError, errorMessage } = useSelector(
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
            <Container fluid className="appContainer">
              <div>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/courses">
                    <CourseList isExpanded={true} />
                  </Route>
                  <Route exact path="/mycourses">
                    <UserCourses isExpanded={true} />
                  </Route>
                  <Route exact path="/progression">
                    <Progression isExpanded={true} />
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
