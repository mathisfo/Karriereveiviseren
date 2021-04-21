import axios from "axios";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Button, Checkbox, Dropdown, Form, Input } from "semantic-ui-react";
import { Course } from "../store/interfaces/Course";
import { useAppDispatch, AppState } from "../store/redux/store";
import { courseSlice } from "../store/slices/courseSlice";

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
    const restriction = e.target.elements.restriction.value;
    const category = e.target.elements.category.value;
    const classroom = e.target.elements.classroom.value;

    let response = await axios
      .post(
        "http://localhost:8000/api/course/",
        {
          title: title,
          startDate: startDate,
          endDate: endDate,
          description: description,
          shortDescription: shortDescription,
          restriction: restriction,
          category: category,
          classroom: classroom,
        },
        { withCredentials: true }
      )
      .then((result) => {
        dispatch(courseSlice.actions.addCourse(result.data));
      });
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Field>
        <label>Tiltak</label>
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
        <label htmlFor="">Spor</label>
        <Input type="text" name="restriction" />
      </Form.Field>
      <Form.Field label="Kategori" control="select" name="category">
        {categories.map((e) => (
          <option value={e.id}>{e.category}</option>
        ))}
      </Form.Field>
      <Form.Field>
        <label htmlFor="">Google Classroom</label>
        <input type="text" name="classroom" />
      </Form.Field>
      <Button type="submit">Lagre</Button>
    </Form>
  );
};

export default SubmitCourseForm;
