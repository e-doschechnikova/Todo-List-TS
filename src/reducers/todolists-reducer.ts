import {v1} from "uuid";
import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";


export const todolistsReducer = (
    todolists = initialState,
    action: ActionType
): Array<TodoListDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map(el => ({...el, filter: "all"}))
        }
        case "ADD-TODOLIST":
            return [
                ...todolists,
                {id: action.todolistId, title: action.title, filter: "all", addedDate: "", order: 0},
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

const initialState: Array<TodoListDomainType> = []

type ActionType =
    | RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | SetTodoListType

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export type SetTodoListType =
    {
        type: "SET-TODOLISTS"
        todolists: TodoListType[]
    }
///----------- action creators -----------\\\

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

export const setTodolistsAC = (todolists: TodoListType[]): SetTodoListType => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
}

///----------- thunks creators -----------\\\

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })

}

