import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (
    state: Array<TodoListDomainType> = initialState,
    action: ActionType
): Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            const newTodolist: TodoListDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state];
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id);
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) =>
                tl.id === action.id ? {...tl, filter: action.filter} : tl
            );
        case "CHANGE-TODOLIST-TITLE":
            return state.map((tl) =>
                tl.id === action.id ? {...tl, title: action.title} : tl
            );
        case "SET-TODOLISTS": {
            return action.todolists.map(el => ({...el, filter: "all"}))
        }
        default:
            return state;
    }
};

///----------- type for action type -----------\\\

export type AddTodoListAT = {
    type: "ADD-TODOLIST";
    todolist: TodoListType
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

export const AddTodoListAC = (todolist: TodoListType): AddTodoListAT => ({
    type: "ADD-TODOLIST",
    todolist
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

export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistID).then((res) => {
        dispatch(RemoveTodoListAC(todolistID))
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title).then((res) => {
        dispatch(AddTodoListAC(res.data.data.item))
    })
}

export const ChangeTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title).then((res) => {
        dispatch(ChangeTodoListTitleAC(title, id))
    })
}