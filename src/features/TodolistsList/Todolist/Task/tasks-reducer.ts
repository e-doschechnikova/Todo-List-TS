import {addTodoListAC, removeTodoListAC, setTodolistsAC} from "../todolists-reducer";
import {TaskType, ResultCode, todolistAPI, UpdateTasksModelType} from "../../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../api/store";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetWorkError} from "../../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TaskStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistID: string }>) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskID: string, model: UpdateDomainTasksModelType, todolistID: string }>) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTaskAC(state, action: PayloadAction<{ tasks: TaskType[], todolistID: string }>) {
            state[action.payload.todolistID] = action.payload.tasks
        },
    },
    extraReducers: (bulder) => {
        bulder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        bulder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.id]
        });
        bulder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            });
        });
    }
})

export const tasksReducer = slice.reducer

export const {removeTaskAC, addTaskAC, updateTaskAC, setTaskAC} = slice.actions

///----------- thunks creators -----------\\\
export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.getTasks(todolistID)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC({tasks, todolistID}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}
export const removeTaskTC = (taskID: string, todolistID: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        await todolistAPI.deleteTasks(taskID, todolistID)
        dispatch(removeTaskAC({taskID, todolistID}))
        dispatch(setAppStatusAC({status: "succeeded"}))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as (_Error)).error
                : err.message
            dispatch(setAppErrorAC({error}))
        }
        dispatch(setAppStatusAC({status: "failed"}))
    }
}
export const addTaskTC = (taskTitle: string, todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistAPI.createTasks(todolistID, taskTitle)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetWorkError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatusAC({status: "idle"}))
        })
}
export const updateTaskTC = (taskID: string, todolistID: string, model: UpdateDomainTasksModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistID].find((t) => t.id === taskID)
    if (task) {
        const apiModel: UpdateTasksModelType = {
            title: task.title,
            deadline: task.deadline,
            startDate: task.startDate,
            description: task.description,
            priority: task.priority,
            status: task.status,
            ...model

        }

        dispatch(setAppStatusAC({status: "loading"}))
        todolistAPI.updateTasks(todolistID, taskID, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskID, model, todolistID}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }

            })
            .catch((error: AxiosError) => {
                handleServerNetWorkError(dispatch, error)
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: "idle"}))
            })
    }
}

///----------- types -----------\\\
export type TaskStateType = {
    [todolistID: string]: Array<TaskType>;
};

export type UpdateDomainTasksModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

type _Error = {
    error: string
}