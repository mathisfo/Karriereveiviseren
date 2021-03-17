import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./components/CourseCard";
import TopNavigator from "./components/TopNavigator";
import Landing from "./components/Landing";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import MyCourses from "./components/MyCourses";
import Progression from "./components/Progression";
import CourseProvider, { CourseContext } from "./store/CourseContext/";

function App() {
  const { error, loading, courseList, apiRequest, apiSuccess, apiError } = useContext(CourseContext);

  useEffect(() => {
    apiRequest();
    fetch("http://127.0.0.1:8000/api/course/")
      .then((res) => res.json())
      .then(
        (result) => {
          apiSuccess(result);
        },
        (error) => {
          apiError(error);
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
              <Container >
              <Row>
              {courseList.map((course: any) => (
                <Col>
                  <CourseCard {...course}></CourseCard>
                </Col>
              ))}
            </Row>
            </Container>
              </Route>
              <Route exact path="/courses">
                <MyCourses/>
              </Route>
              <Route exact path="/progression">
                <Progression />
              </Route>
            </Switch>
            </div>
          </Container>
        </div>
      ) : (
        <Landing handleClick={() => setShowSite(!showSite)} />
      )}
      </BrowserRouter>
  );
}

export default () => (
  <CourseProvider>
    <App />
  </CourseProvider>
);