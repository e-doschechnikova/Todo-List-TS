import {TaskStateType} from "../AppWithRedux";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListAT} from "./todolists-reducer";
import {CreateTaskType, TaskType, todolistAPI, UpdateTasksModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../redux/store";

///----------- type -----------\\\
type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListAT
    | ReturnType<typeof setTaskAC>

const initialState: TaskStateType = {}

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
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    ...action.model
                } : task)
            }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        default:
            return state
    }
}

///----------- action creators -----------\\\
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK",
    taskId,
    todolistId
} as const);
export const addTaskAC = (task: CreateTaskType) => ({type: "ADD-TASK", task} as const);
export const updateTaskAC = (taskID: string, model: UpdateDomainTasksModelType, todolistID: string) => ({
    type: "UPDATE-TASK",
    taskID,
    model,
    todolistID
} as const);
export const setTaskAC = (tasks: TaskType[], todolistId: string) => ({type: "SET-TASK", tasks, todolistId} as const)

///--
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
export type UpdateDomainTasksModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (taskID: string, todolistID: string, domainModel: UpdateDomainTasksModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistID].find((t) => t.id === taskID)
    if (task) {
        const apiModel: UpdateTasksModelType = {
            title: task.title,
            deadline: task.deadline,
            startDate: task.startDate,
            description: task.description,
            priority: task.priority,
            status: task.status,
            ...domainModel

        }
        todolistAPI.updateTasks(todolistID, taskID, apiModel).then((res) => {
            dispatch(updateTaskAC(taskID, domainModel, todolistID))
        })
    }
}


