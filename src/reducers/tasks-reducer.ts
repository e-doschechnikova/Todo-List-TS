import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppDispatch} from "../redux/store";

///----------- type for action type -----------\\\

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}

const initialState: TaskStateType = {}

type ActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAC
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListType
    | ReturnType<typeof setTaskAC>


export const tasksReducer = (
    state = initialState,
    action: ActionsType
): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
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
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
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

export const setTaskAC = (tasks: TaskType[], todolistId: string) => ({
    type: "SET-TASK", tasks, todolistId
} as const)

///----------- thunks creators -----------\\\

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<any>) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todolistId))
        })
}

