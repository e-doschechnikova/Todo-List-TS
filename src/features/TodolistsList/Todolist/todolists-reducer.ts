import {todolistAPI, TodoListType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC,} from "../../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetWorkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodoListDomainType> = []

export const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodoListAC(state, action: PayloadAction<{ todolist: TodoListType }>) {
            state.push({...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state)
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ title: string, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodoListType[] }>) {
            state = action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        }
    }
})
export const todolistsReducer = slice.reducer
export const {
    removeTodoListAC,
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC
} = slice.actions

///----------- thunks creators -----------\\\
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch(() => {
            dispatch(setAppStatusAC({status: "failed"}))
        })
}
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id: todolistID, status: "loading"}))
    todolistAPI.deleteTodolist(todolistID)
        .then((res) => {
            dispatch(removeTodoListAC({id: todolistID}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((error: AxiosError) => {
            dispatch(changeTodolistEntityStatusAC({id: todolistID, status: "idle"}))
            handleServerNetWorkError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatusAC({status: "idle"}))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC({todolist: res.data.data.item}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetWorkError(dispatch, error)
        })
}
export const changeTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.updateTodolist(id, title).then((res) => {
        dispatch(changeTodoListTitleAC({title: title, id: id}))
        dispatch(setAppStatusAC({status: "succeeded"}))
    })
}

///----------- types -----------\\\
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type SetTodoListAT = ReturnType<typeof setTodolistsAC>

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}