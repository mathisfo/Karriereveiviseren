import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import CourseCard from "./components/CourseCard";
import TopNavigator from "./components/TopNavigator";
import Landing from "./components/Landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import Progression from "./components/Progression";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/course/")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCourses(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  console.log(courses);

  const [showSite, setShowSite] = React.useState(false);

  function getStorage() {
    const getKey = JSON.parse(localStorage.getItem("LandingKey")!);
    return getKey === true && getKey != null;
  }

  return (
    <div>
      {!getStorage() ? (
        <div>
          <TopNavigator></TopNavigator>
          <Container className="p-3">
            <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/home">Hjem</Link>
                  </li>
                  <li>
                    <Link to="/courses">Mine tiltak</Link>
                  </li>
                  <li>
                    <Link to="/progression">Progresjon</Link>
                  </li>
                </ul>
              </nav>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/courses">
              <Container >
              <Row>
              {courses.map((course: any) => (
                <Col>
                  <CourseCard {...course}></CourseCard>
                </Col>
              ))}
            </Row>
            </Container>
              </Route>
              <Route path="/progression">
                <Progression />
              </Route>
            </Switch>
            </div>
            </Router>
          </Container>
        </div>
      ) : (
        <Landing handleClick={() => setShowSite(!showSite)} />
      )}
    </div>
  );
}

export default App;
