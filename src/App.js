import React, { useState, useEffect } from "react";
import "./App.css";


// Debug View Widget Component
const DebugView = ({ state }) => {
  return (
    <div style={{ background: "#222", color: "#fff", padding: "10px", fontSize: "14px", overflow: "auto" }}>
      <h3>Debug View</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

// To-Do List Application
const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };
  

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  const saveTask = () => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
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
  
  return (
    <div className="app-container">
      {/* Main To-Do List UI */}
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
            <li key={index} className={editIndex === index ? "editing" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                const updatedTasks = [...tasks];
                updatedTasks[index].completed = !task.completed;
                setTasks(updatedTasks);
              }}
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
  
      {/* Debug View Widget */}
      <div className="debug-view">
        <h3>Debug View</h3>
        <pre>{JSON.stringify({ tasks, newTask, editIndex }, null, 2)}</pre>
      </div>
    </div>
  );
  
};

export default TodoApp;
