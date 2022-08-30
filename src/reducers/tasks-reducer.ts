import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

///----------- type for action type -----------\\\

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

const initialState: TaskStateType = {}

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAC | AddTodoListAT | RemoveTodoListAT

// function:
// тип действия + необходимые данные для этого действия

// @ts-ignore
export const tasksReducer = (
    state = initialState,
    action: ActionsType
): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-STATUS-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.isDone
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

// Action Creators:

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const

};
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
};
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-STATUS-TASK", taskId, isDone, todolistId} as const
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId} as const
};




