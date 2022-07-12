import { FilterValuesType } from "./../App";
import { v1 } from "uuid";
import { TodoListType } from "../App";

///-----------type for action type -----------\\\

type AddTodoListAT = {
  type: "ADD-TODOLIST";
  title: string;
  id: string;
};

type RemoveTodoListAT = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type ChangeTodoListTitleAT = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodoListFilterAT = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

///-------------------------------------------\\\

type ActionType =
  | RemoveTodoListAT
  | AddTodoListAT
  | ChangeTodoListFilterAT
  | ChangeTodoListTitleAT;

export const todolistsReducer = (
  todolists: Array<TodoListType>,
  action: ActionType
): Array<TodoListType> => {
  switch (action.type) {
    case "ADD-TODOLIST":
      return [
        ...todolists,
        { id: action.id, title: action.title, filter: "all" },
      ];
    case "REMOVE-TODOLIST":
      return todolists.filter((tl) => tl.id !== action.id);
    case "CHANGE-TODOLIST-FILTER":
      return todolists.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    case "CHANGE-TODOLIST-TITLE":
      return todolists.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    default:
      return todolists;
  }
};

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({
  type: "REMOVE-TODOLIST",
  id,
  //   id: id,
});

export const AddTodoListAC = (title: string, id: string): AddTodoListAT => ({
  type: "ADD-TODOLIST",
  title,
  id,
});

export const ChangeTodoListTitleAC = (
  title: string,
  id: string
): ChangeTodoListTitleAT => ({
  type: "CHANGE-TODOLIST-TITLE",
  id,
  title,
});

export const ChangeTodoListFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodoListFilterAT => ({
  type: "CHANGE-TODOLIST-FILTER",
  id,
  filter,
});
