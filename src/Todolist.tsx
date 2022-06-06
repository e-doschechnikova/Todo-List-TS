import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  const [newTitle, setNewTitle] = useState("");
  console.log(newTitle);

  const addTaskHandler = () => {
    props.addTask(newTitle);
    setNewTitle(" ");
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };

  const tsarChangeFilterHandler = (value: FilterValuesType) => {
    props.changeFilter(value);
  };
  //   const allChangeFilterHandler = () => props.changeFilter("all");
  //   const activeChangeFilterHandler = () => props.changeFilter("active");
  //   const completedChangeFilterHandler = () => props.changeFilter("completed");

  const removeTaskHandler = (tID: string) => {
    props.removeTask(tID);
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          //   const removeTaskHandler = () => props.removeTask(t.id);

          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={() => removeTaskHandler(t.id)}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => tsarChangeFilterHandler("all")}>All</button>
        <button onClick={() => tsarChangeFilterHandler("active")}>
          Active
        </button>
        <button onClick={() => tsarChangeFilterHandler("completed")}>
          Completed
        </button>
        {/* <button onClick={allChangeFilterHandler}>All</button>
        <button onClick={activeChangeFilterHandler}>Active</button>
        <button onClick={completedChangeFilterHandler}>Completed</button> */}
      </div>
    </div>
  );
}
