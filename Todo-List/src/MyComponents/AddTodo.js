import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const AddTodo = ({ addTodo }) => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Title or Description cannot be blank");
    } else {
      addTodo(title, desc);
      setTitle("");
      setDesc("");
    }
  }

  return (
    <div className="container">
      <h3>Add a Todo</h3>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Todo Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter todo title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDesc">
          <Form.Label>Todo description</Form.Label>
          <Form.Control type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Add a description" />
        </Form.Group>
        <Button className='btn btn-sm btn-success' variant="primary" type="submit">
          Add Todo
        </Button>
      </Form>
    </div>
  )
}
