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

///-------------------------------------------\\\

type ActionType = RemoveTodoListAT | AddTodoListAT;

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

    default:
      return todolists;
  }
};
