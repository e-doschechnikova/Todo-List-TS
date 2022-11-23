import {todolistAPI, TodoListType} from "../../../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (
    state: Array<TodoListDomainType> = initialState,
    action: ActionsType
): Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state];
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
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: "all"}))
        default:
            return state;
    }
};

///----------- action creators -----------\\\
export const RemoveTodoListAC = (id: string) => ({type: "REMOVE-TODOLIST", id,} as const);
export const AddTodoListAC = (todolist: TodoListType) => ({type: "ADD-TODOLIST", todolist} as const);
export const ChangeTodoListTitleAC = (title: string, id: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title,
} as const);
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter,
} as const);
export const setTodolistsAC = (todolists: TodoListType[]) => ({type: "SET-TODOLISTS", todolists} as const)

///----------- thunks creators -----------\\\
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTodolist().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTodolist(todolistID).then((res) => {
        dispatch(RemoveTodoListAC(todolistID))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTodolist(title).then((res) => {
        dispatch(AddTodoListAC(res.data.data.item))
    })
}
export const ChangeTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(id, title).then((res) => {
        dispatch(ChangeTodoListTitleAC(title, id))
    })
}

///----------- types -----------\\\
export type AddTodoListAT = ReturnType<typeof AddTodoListAC>
export type RemoveTodoListAT = ReturnType<typeof RemoveTodoListAC>
export type SetTodoListAT = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodoListAT
    | AddTodoListAT
    | ReturnType<typeof ChangeTodoListFilterAC>
    | ReturnType<typeof ChangeTodoListTitleAC>
    | SetTodoListAT

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}