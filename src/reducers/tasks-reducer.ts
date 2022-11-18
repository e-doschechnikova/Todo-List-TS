import {TaskStateType} from "../AppWithRedux";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListType} from "./todolists-reducer";
import {CreateTaskType, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

///----------- type for action type -----------\\\

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

const initialState: TaskStateType = {}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: CreateTaskType
}

type ActionsType =
    RemoveTaskAT
    | AddTaskActionType
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
        case "ADD-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            } as TaskStateType
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

export const addTaskAC = (task: CreateTaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task} as const
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

export const removeTaskTC = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTasks(taskID, todolistID).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(taskID, todolistID))
        }
    })
}

export const addTaskTC = (taskTitle: string, todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.createTasks(todolistID, taskTitle).then((res) => {
        dispatch(addTaskAC(res.data.data.item))
    })
}

