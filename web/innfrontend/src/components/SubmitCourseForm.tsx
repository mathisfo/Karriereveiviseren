import axios from "axios";
import { callbackify } from "node:util";
import React, { FC, useContext } from "react";
import { useSelector } from "react-redux";
import { Button, Checkbox, Dropdown, Form, Icon, Input } from "semantic-ui-react";
import { Course } from "../store/interfaces/Course";
import { useAppDispatch, AppState } from "../store/redux/store";
import { courseSlice } from "../store/slices/courseSlice";
import { ownCourseSlice } from "../store/slices/ownCourseSlice";

interface IProps {
  handleSave: (save: boolean) => void;
}

const SubmitCourseForm:FC<IProps> = ( { handleSave } ) => {
  const dispatch = useAppDispatch();
  const courses = useSelector((state: AppState) => state.courses.courseList);
  const categories = useSelector(
    (state: AppState) => state.categories.categoryList
  );
  const [saved, setSaved] = React.useState(false);

  const user = useSelector((state: AppState) => state.user.user);


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
    <Form onSubmit={(e) => handleSubmit(e)}>
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
        <label  htmlFor="">Sluttdato</label>
        <Input required type="datetime-local" name="endDate" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="">Kort beskrivelse</label>
        <Input required type="text" name="shortDescription" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="">Målsetning</label>
        <Input required type="text" name="goal" />
      </Form.Field>
      <Button content="Lagre" type="submit" onClick={() => handleSave(false)} positive>Lagre</Button>
    </Form>
    
  );
};

export default SubmitCourseForm;
