import React, { useState } from "react";
import { FilterValueType } from "./App";

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  // changeFilter: (value: FilterValueType) => void;
};

export function Todolist(props: PropsType) {
  const [filterValue, setfilterValue] = useState("all");

  const changeFilter = (value: FilterValueType) => {
    setfilterValue(value);
  };

  let filterTasks = props.tasks;
  if (filterValue === "complited") {
    filterTasks = props.tasks.filter((el) => el.isDone === true);
  }
  if (filterValue === "active")
    filterTasks = props.tasks.filter((el) => el.isDone === false);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {filterTasks.map((el, index) => {
          return (
            <li key={el.id}>
              <button onClick={() => props.removeTask(el.id)}>x</button>
              <input type="checkbox" checked={el.isDone} />
              <span>{el.title}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => changeFilter("all")}>All</button>
        <button onClick={() => changeFilter("active")}>Active</button>
        <button onClick={() => changeFilter("complited")}>Completed</button>
      </div>
    </div>
  );
}
