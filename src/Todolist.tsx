import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
// rsc
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;

  addTask: (title: string, todolistID: string) => void;
  removeTask: (taskID: string, todolistID: string) => void;
  changeTaskTitle: (
    taskTitle: string,
    title: string,
    todolistID: string
  ) => void;
  changeTaskStatus: (
    taskID: string,
    isDone: boolean,
    todolistID: string
  ) => void;

  changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void;
  changeTodoListTitle: (title: string, todolistID: string) => void;

  removeTodolist: (todolistID: string) => void;
};

const TodoList = (props: TodoListPropsType) => {
  const tasksJSX = props.tasks.length ? (
    props.tasks.map((t) => {
      const removeTask = () => props.removeTask(t.id, props.id);
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);

      const changeTaskTitle = (taskTitle: string) => {
        props.changeTaskTitle(t.id, taskTitle, props.id);
      };

      return (
        <li key={t.id} className={t.isDone ? "task isDone" : "task"}>
          <input
            onChange={changeTaskStatus}
            type="checkbox"
            checked={t.isDone}
          />
          <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
          <button onClick={removeTask}>х</button>
        </li>
      );
    })
  ) : (
    <span>Your taskslist is empty</span>
  );
  const createOnClickHandler = (filter: FilterValuesType) => {
    /*const onClickHandler = () => props.changeTodoListFilter(filter, props.id)
        return onClickHandler*/
    return () => props.changeTodoListFilter(filter, props.id);
  };
  /*const onClickHandler = () => props.changeTodoListFilter("all")*/
  const addTask = (title: string) => props.addTask(title, props.id);
  const removeTodolist = () => props.removeTodolist(props.id);

  const changeTodoListTitle = (todolistTitle: string) =>
    props.changeTodoListTitle(todolistTitle, props.id);

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <button onClick={removeTodolist}>Del</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>{tasksJSX}</ul>
      <div>
        <button
          className={props.filter === "all" ? "active" : ""}
          onClick={createOnClickHandler("all")}
          /* onClick={() => props.changeTodoListFilter("all", props.id)}*/
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active" : ""}
          onClick={createOnClickHandler("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active" : ""}
          onClick={createOnClickHandler("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
