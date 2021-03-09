import React, { Component, FC } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface IProps {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  restriction: number;
}

function setColor(modul?: number) {
  switch (modul) {
    case 1:
      return "pink";
    case 2:
      return "limegreen";
    case 3:
      return "orange";
    case 4:
      return "lightblue";
    default:
      return "grey";
  }
}

const CourseCard: FC<IProps> = (props) => {
  return (
    <div>
      <Card
        style={{
          width: "18rem",
          background: setColor(props.id),
          margin: "1cm",
        }}
      >
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="primary">Mer informasjon</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CourseCard;
