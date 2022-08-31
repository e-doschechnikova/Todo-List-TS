import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

///----------- type for action type -----------\\\

export type AddTodoListAT = {
    type: "ADD-TODOLIST";
    title: string;
    todolistId: string
};

export type RemoveTodoListAT = {
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

type ActionType =
    | RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT;

// function:
// тип действия + необходимые данные для этого действия

export const todolistsReducer = (
    todolists: Array<TodoListType>,
    action: ActionType
): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [
                ...todolists,
                {id: action.todolistId, title: action.title, filter: "all"},
            ];
        case "REMOVE-TODOLIST":
            return todolists.filter((tl) => tl.id !== action.id);
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map((tl) =>
                tl.id === action.id ? {...tl, filter: action.filter} : tl
            );
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map((tl) =>
                tl.id === action.id ? {...tl, title: action.title} : tl
            );
        default:
            return todolists;
    }
};

// Action Creators:

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    id,
    //   id: id,
});

export const AddTodoListAC = (title: string): AddTodoListAT => ({
    type: "ADD-TODOLIST",
    title,
    todolistId: v1()
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
