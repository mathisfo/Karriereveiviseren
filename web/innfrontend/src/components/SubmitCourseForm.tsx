import axios from "axios";
import React, { useContext } from "react";
import { Button, Checkbox, Dropdown, Form, Input } from "semantic-ui-react";
import { CategoryContext } from "../store/CategoryContext/";

const SubmitCourseForm = (e: any) => {
  const categoryContext = useContext(CategoryContext);

  function handleSubmit(e: any) {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const startDate = e.target.elements.startDate.value;
    const endDate = e.target.elements.endDate.value;
    const description = e.target.elements.description.value;
    const shortDescription = e.target.elements.shortDescription.value;
    const restriction = e.target.elements.restriction.value;
    const category = e.target.elements.category.value;
    const classroom = e.target.elements.classroom.value;

    axios.post(
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
    );
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
        {categoryContext?.state.categoryList.map((e) => (
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
