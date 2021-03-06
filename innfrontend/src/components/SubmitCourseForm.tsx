import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "semantic-ui-react";
import { useAppDispatch, AppState } from "../redux/store/store";
import { ownCourseSlice } from "../redux/slices/ownCourseSlice";

const SubmitCourseForm = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppState) => state.user.user);

  async function handleSubmit(e: any) {
    e.preventDefault();
    
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
          user: user.id,
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
    <Form onSubmit={(e) => handleSubmit(e)} data-cy="form">
      <Form.Field>
        <label>Egen aktivitet</label>
        <Input required placeholder="Tiltak" name="title" />
      </Form.Field>
      <Form.Field>
        <label>Beskrivelse</label>
        <Input required placeholder="Beskrivelse" name="description" />
      </Form.Field>
      <Form.Field>
        <label>Startdato</label>
        <Input required type="datetime-local" name="startDate" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="">Sluttdato</label>
        <Input required type="datetime-local" name="endDate" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="">Kort beskrivelse</label>
        <Input required type="text" name="shortDescription" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="">M??lsetning</label>
        <Input required type="text" name="goal" />
      </Form.Field>
      <Button content="Lagre" type="submit" positive data-cy="saveButton">
        Lagre
      </Button>
    </Form>
  );
};

export default SubmitCourseForm;
