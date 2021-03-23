import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import TopNavigator from "./components/TopNavigator";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import MyCourses from "./components/MyCourses";
import Progression from "./components/Progression";
import CourseProvider, { CourseContext } from "./store/CourseContext/";

function App() {
  const courseContext = useContext(CourseContext);

  useEffect(() => {
    // Need conditional render because of possible null in courseContext
    // Have not found a fix for this if we are going with the reducer instead of state
    courseContext?.dispatch({ type: "API_REQUEST" });
    fetch("http://127.0.0.1:8000/api/course/")
      .then((res) => res.json())
      .then(
        (result) => {
          courseContext?.dispatch({ type: "API_SUCCESS", payload: result });
        },
        (error) => {
          courseContext?.dispatch({ type: "API_ERROR", payload: error });
        }
      );
  }, []);

  const [showSite, setShowSite] = React.useState(false);

  function getStorage() {
    const getKey = JSON.parse(localStorage.getItem("LandingKey")!);
    return getKey === true && getKey != null;
  }

  return (
    <BrowserRouter>
      {!getStorage() ? (
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
      ) : (
        <Login/>
      )}
    </BrowserRouter>
  );
}

export default () => (
  <CourseProvider>
    <App />
  </CourseProvider>
);
