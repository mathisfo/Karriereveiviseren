import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import TopNavigator from "./components/TopNavigator";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import CourseList from "./components/courseList/";
import UserCourses from "./components/userCourses/";
import Progression from "./components/progression/";
import GoogleSocialAuth from "./components/GoogleSocialAuth";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GoogleSocialAuth />
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
    </Provider>
  );
}

export default App;
