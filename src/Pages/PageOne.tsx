import React from "react";
import { useMachine } from "@xstate/react";
import { todoMachine } from "./TodoMachine";

const TodoList: React.FC = () => {
  const [state, send] = useMachine(todoMachine);

  const handleAddTodo = () => {
    const text = prompt("Enter todo:");
    if (text) {
      send({ type: "ADD", text });
    }
  };

  const handleToggleTodo = (id: number) => {
    send({ type: "TOGGLE", id });
  };

  const handleDeleteTodo = (id: number) => {
    send({ type: "DELETE", id });
  };

  const updateTodo = (id: number, newText: string) => {
    const text = prompt(newText);
    if (text) {
      send({ type: "UPDATE", id, newText: text });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          marginTop: "200px",
          marginBottom: "100px",
        }}
      >
        <h1>Todo List</h1>
        <button onClick={handleAddTodo} style={{ background: "grey" }}>
          Add Todo
        </button>
      </div>

      <div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {state.context.todos.map((todo) => (
            <li
              key={todo.id}
              className="card "
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => updateTodo(todo.id, todo.text)}
                style={{ background: "grey" }}
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={{ background: "grey" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
