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
  addTask: (title: string) => void;
  changeCheckBox: (id: string, value: boolean) => void;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("");

  const addTask = () => {
    props.addTask(title.trim());
    setTitle("");
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask();
    }
  };

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  // const changeCheckBoxHandler = (
  //   tID: string,
  //   event: ChangeEvent<HTMLInputElement>
  // ) => props.changeCheckBox(tID, event.currentTarget.checked);

  const changeCheckBoxHandler = (tID: string, eventValue: boolean) =>
    props.changeCheckBox(tID, eventValue);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id);

          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  changeCheckBoxHandler(t.id, event.currentTarget.checked)
                }
              />
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
