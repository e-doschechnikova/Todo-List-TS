import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";

export type FilterValueType = "all" | "active" | "complited";

function App() {
  //   let tasks1 = [
  //     { id: 1, title: "HTML&CSS", isDone: true },
  //     { id: 2, title: "JS", isDone: true },
  //     { id: 3, title: "ReactJS", isDone: false },
  //   ];

  let [tasks1, setTasks1] = useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
  ]);

  const removeTask = (id: number) => {
    tasks1 = tasks1.filter((el) => el.id !== id);
    setTasks1(tasks1);
    console.log(tasks1);
  };

  //   const [filterValue, setfilterValue] = useState("all");

  //   const changeFilter = (value: FilterValueType) => {
  //     setfilterValue(value);
  //   };

  //   let filterTasks = tasks1;
  //   if (filterValue === "complited") {
  //     filterTasks = tasks1.filter((el) => el.isDone === true);
  //   }
  //   if (filterValue === "active")
  //     filterTasks = tasks1.filter((el) => el.isDone === false);

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks1}
        removeTask={removeTask}
        // changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
