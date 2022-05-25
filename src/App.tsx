import React from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TasksPropsType } from "./Todolist";

function App() {
  const tasks1: Array<TasksPropsType> = [
    { id: 1, title: "CSS", isDone: false },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: true },
  ];

  const tasks2: Array<TasksPropsType> = [
    { id: 1, title: "The Notebook", isDone: false },
    { id: 2, title: "The Great Gatsby", isDone: false },
    { id: 3, title: "The Age of Adaline", isDone: true },
  ];

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks1} />
      <Todolist title="What to watch" tasks={tasks2} />
    </div>
  );
}

export default App;
