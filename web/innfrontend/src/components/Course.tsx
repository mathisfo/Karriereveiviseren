import React, { useEffect, useState } from "react";

interface CourseItems {
  title: string;
}

type IData = CourseItems[];

const Course = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<{ data: IData | null }>();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/1/")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div>
      <p>Heihei</p>
      <p>{items.title}</p>
    </div>
  );
};

export default Course;
