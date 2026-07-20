import React from 'react';
import { TodoItems } from '../MyComponents/TodoItems';

export const Todos = (props) => {
  return (
    <div className="container my-3">
      <h3 className="my-3"> Todos List</h3>
      {props.todos.length===0? "No todos to display": 
      props.todos.map((todos) => {
        return (
          <div key={todos.id}>
        <TodoItems todo={todos} onDelete={props.onDelete}/><hr/>
        </div>
        )
      })
    }
    </div>
  )
}
