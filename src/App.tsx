import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TasksPropsType } from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TasksPropsType>>([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (id: number) => {
    let filteredTasks = tasks.filter((el) => el.id !== id);
    setTasks(filteredTasks);
  };

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((el) => el.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((el) => el.isDone === false);
  }
  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      {/* <Todolist title="What to watch" tasks={tasks2}/> */}
    </div>
  );
}
export default App;

// const tasks2: Array<TasksPropsType> = [
//   // { id: 1, title: "The Notebook", isDone: false },
//   { id: 2, title: "The Great Gatsby", isDone: false },
//   { id: 3, title: "The Age of Adaline", isDone: true },
// ];
