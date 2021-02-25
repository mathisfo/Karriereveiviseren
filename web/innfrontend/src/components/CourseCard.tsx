import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

type myProps = {
  title: string;
  text: string;
  modul: string;
};

function setColor(modul?: string) {
  switch (modul) {
    case "felles":
      return "pink";
    case "spor1":
      return "yellow";
    case "spor2":
      return "limegreen";
    case "spor3":
      return "orange";
    case "ungdom":
      return "lightblue";
    default:
      return "grey";
  }
}

export default class CourseCard extends React.Component<myProps> {
  render() {
    return (
      <div>
        <Card
          style={{
            width: "18rem",
            background: setColor(this.props.modul),
            margin: "1cm",
          }}
        >
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>{this.props.text}</Card.Text>
            <Button variant="primary">Mer informasjon:</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
