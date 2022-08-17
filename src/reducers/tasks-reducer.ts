import {TaskStateType} from "../App";
import {v1} from "uuid";

///----------- type for action type -----------\\\

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>

export type AddTaskAC = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskAT | AddTaskAC


// function:
// тип действия + необходимые данные для этого действия

// @ts-ignore
export const tasksReducer = (
    state: TaskStateType,
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
        default:
            return state
    }
};

// Action Creators:

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const

};

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
};


