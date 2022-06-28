import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./App";
import { Button } from "./components/Button";
// rsc
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  tasks: TaskType[];
  addTask: (title: string, todolistID: string) => void;
  removeTask: (taskID: string, todolistID: string) => void;
  changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void;
  changeTaskStatus: (
    taskID: string,
    isDone: boolean,
    todolistID: string
  ) => void;
  removeTodolist: (todolistID: string) => void;
};

const TodoList = (props: TodoListPropsType) => {
  const tasksJSX = props.tasks.length ? (
    props.tasks.map((t) => {
      const removeTask = () => props.removeTask(t.id, props.id);
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
      };
      return (
        <li key={t.id}>
          <input
            onChange={changeTaskStatus}
            type="checkbox"
            checked={t.isDone}
          />
          <span className={t.isDone ? "task isDone" : "task"}>{t.title}</span>
          <button onClick={removeTask}>х</button>
        </li>
      );
    })
  ) : (
    <span>Your taskslist is empty</span>
  );

  const createOnClickHandler = (filter: FilterValuesType) => {
    return () => props.changeTodoListFilter(filter, props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <button onClick={() => props.removeTodolist(props.id)}>del</button>
      <AddItemForm addItem={addTask} />

      <ul>{tasksJSX}</ul>
      <div>
        <button
          className={props.filter === "all" ? "active" : ""}
          //   onClick={() => props.changeTodoListFilter("all", props.id)}
          onClick={createOnClickHandler("all")}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active" : ""}
          //   onClick={() => props.changeTodoListFilter("active", props.id)}
          onClick={createOnClickHandler("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active" : ""}
          //   onClick={() => props.changeTodoListFilter("completed", props.id)}
          onClick={createOnClickHandler("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
