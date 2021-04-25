import axios from "axios";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Button, Checkbox, Dropdown, Form, Icon, Input } from "semantic-ui-react";
import { Course } from "../store/interfaces/Course";
import { useAppDispatch, AppState } from "../store/redux/store";
import { courseSlice } from "../store/slices/courseSlice";
import { ownCourseSlice } from "../store/slices/ownCourseSlice";

const SubmitCourseForm = (e: any) => {
  const dispatch = useAppDispatch();
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const categories = useSelector(
    (state: AppState) => state.categories.categoryList
  );

  async function handleSubmit(e: any) {
    e.preventDefault();
    //TODO: Better way to do this
    const title = e.target.elements.title.value;
    const startDate = e.target.elements.startDate.value;
    const endDate = e.target.elements.endDate.value;
    const description = e.target.elements.description.value;
    const shortDescription = e.target.elements.shortDescription.value;
    const goal = e.target.elements.goal.value;

    let response = await axios
      .post(
        "api/owncourse/",
        {
          user: 1,
          title: title,
          startDate: startDate,
          endDate: endDate,
          description: description,
          shortDescription: shortDescription,
          goal: goal,
        },
        { withCredentials: true }
      )
      .then((result) => {
        dispatch(ownCourseSlice.actions.addOwnCourse(result.data));
      });
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Field>
        <label>Egen aktivitet</label>
        <Input placeholder="Tiltak" name="title" />
      </Form.Field>
      <Form.Field>
        <label>Beskrivelse</label>
        <Input placeholder="Beskrivelse" name="description" />
      </Form.Field>
      <Form.Field>
        <label>Startdato</label>
        <Input type="datetime-local" name="startDate" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="">Sluttdato</label>
        <Input type="datetime-local" name="endDate" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="">Kort beskrivelse</label>
        <Input type="text" name="shortDescription" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="">Målsetning</label>
        <Input type="text" name="goal" />
      </Form.Field>
      <Button content="Lagre" type="submit" positive>Lagre</Button>
    </Form>
    
  );
};

export default SubmitCourseForm;
