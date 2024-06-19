import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./index.css";

const TodosList = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }, []);

  const handelTodlist = () => {
    if (todo === "") {
      return;
    }
    const todoItem = {
      id: uuidv4(),
      description: todo,
      completed: false,
    };
    fetch("http:localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItem),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodoList([...todoList, newTodo]);
        setTodo("");
      });
  };
  const handelDelete = (id) => {
    fetch(`http:localhost:4000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      const filterTodo = todoList.filter((item) => item.id !== id);
      setTodoList(filterTodo);
    });
  };
  const handelCheckbox = (id) => {
    const updatedTodo = todoList.find((item) => item.id === id);
    updatedTodo.completed = !updatedTodo.completed;
    fetch(`http:localhost:4000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }).then(() => {
      const updatedTodoList = todoList.map((item) =>
        item.id === id ? updatedTodo : item
      );
      setTodoList(updatedTodoList);
    });
  };
  return (
    <div className="page">
      <div>
        <img
          src="https://res.cloudinary.com/dtll9buf5/image/upload/v1718732911/Screenshot_2024-06-18_231647_scoauy.png"
          alt="logo"
        />
      </div>
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={handelTodlist} className="sumit-btn">
        Add Todo
      </button>
      <div>
        <ul>
          {todoList.map((item) => (
            <li key={item.id} className="todos">
              <div className="check-name">
                <input
                  type="checkbox"
                  onChange={() => handelCheckbox(item.id)}
                />
                <p
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.description}{" "}
                </p>
              </div>
              <button
                onClick={() => handelDelete(item.id)}
                className="delete-btn"
              >
                Delete Todo
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodosList;
