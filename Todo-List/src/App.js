import './App.css';
import Header from "./MyComponents/Header";
import { Footer } from "./MyComponents/Footer";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [todos, setTodos] = useState([]);

  // View
  const viewTodo = async () => {
    const response = await fetch("http://localhost:5000/todos");

    if (!response.ok) {
      throw new Error("Couldn't load todos");
    }

    const data = await response.json();

    setTodos(data);

  }

  // Add
  const addTodo = async (title, desc) => {

    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: desc
      })
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const myTodo = await response.json();

    setTodos([...todos, myTodo]);
  }

  // Delete
  const onDelete = async (Todos) => {

    const response = await fetch(`http://localhost:5000/todos/${Todos.id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    const updatedTodos = todos.filter((e) => e.id !== Todos.id);
    setTodos(updatedTodos);
  }

  useEffect(() => {
    viewTodo();
  }, []);

  return (
    <>
      <Router>
        <Header title="My Todo List" searchBar={true} />
        <Routes>
          <Route exact path="/" element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
            </>
          }>
          </Route>
          <Route exact path="/about" element={<About />}>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
