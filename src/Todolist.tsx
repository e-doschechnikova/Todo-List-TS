import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import styles from "./Todolist.module.css";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { DeleteOutlineOutlined } from "@material-ui/icons";
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
          <Checkbox
            size={"small"}
            color={"primary"}
            onChange={changeTaskStatus}
            checked={t.isDone}
          />
          <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
          <IconButton>
            <DeleteOutlineOutlined onClick={removeTask} />
          </IconButton>
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
        <IconButton>
          <DeleteOutlineOutlined onClick={removeTodolist} />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>{tasksJSX}</ul>
      <div>
        <Button
          size={"small"}
          variant={"outlined"}
          color={props.filter === "all" ? "secondary" : "primary"}
          onClick={createOnClickHandler("all")}
          /* onClick={() => props.changeTodoListFilter("all", props.id)}*/
        >
          All
        </Button>
        <Button
          size={"small"}
          variant={"outlined"}
          color={props.filter === "active" ? "secondary" : "primary"}
          onClick={createOnClickHandler("active")}
        >
          Active
        </Button>
        <Button
          size={"small"}
          variant={"outlined"}
          color={props.filter === "completed" ? "secondary" : "primary"}
          onClick={createOnClickHandler("completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
