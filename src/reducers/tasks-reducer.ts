import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

///----------- type for action type -----------\\\

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

const initialState: TaskStateType = {}

type ActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAC
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListType


export const tasksReducer = (
    state = initialState,
    action: ActionsType
): TaskStateType => {
    switch (action.type) {
        case "SET_TODOS": {
            const copyState = {...state}
            action.todos.forEach((el) => {
                copyState[el.id] = []
            })
            return copyState
        }
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(), title: action.title, status: TaskStatuses.New,
                    todolistId: action.todolistId,
                    description: "",
                    startDate: "",
                    deadline: "",
                    addedData: "",
                    order: 0,
                    priority: TaskPriorities.Low
                }, ...state[action.todolistId]]
            }
        case "CHANGE-STATUS-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    status: action.status
                } : task)
            }
        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

///----------- action creators -----------\\\
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const

};
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
};
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: "CHANGE-STATUS-TASK", taskId, status, todolistId} as const
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId} as const
};




