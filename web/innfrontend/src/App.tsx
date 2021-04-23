import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import TopNavigator from "./components/TopNavigator";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import MyCourses from "./components/MyCourses";
import Progression from "./components/Progression";
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
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/courses">
                  <MyCourses />
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
