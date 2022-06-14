import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import styles from "./Todolist.module.css";

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
  const [error, setError] = useState(false);
  let [title, setTitle] = useState("");

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim());
      setTitle("");
    } else {
      setError(true);
    }
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
  const changeCheckBoxHandler = (tID: string, eventValue: boolean) =>
    props.changeCheckBox(tID, eventValue);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? styles.error : ""}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={styles.errorMessage}>Title is requred</div>}
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
