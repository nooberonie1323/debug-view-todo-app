import React, { useState, useEffect } from "react";
import "./App.css";

const DebugView = ({ state }) => {
  return (
    <div className="debug-view">
      <h3>Debug View</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  const saveTask = () => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      addTask();
    }
    setNewTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="app-container">
      <div className="todo-list">
        <h2>To-Do List</h2>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={saveTask}>{editIndex !== null ? "Save" : "Add"}</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.text}
              </span>
              <div className="button-group">
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <DebugView state={{ tasks, newTask, editIndex }} />
    </div>
  );
};

export default TodoApp;
