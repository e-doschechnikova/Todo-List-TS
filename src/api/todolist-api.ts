import axios, {AxiosResponse} from "axios"
import {LoginDataType} from "../features/Login/Login";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "9c1a69da-f1af-40a7-806f-4d3b095c12b8",
    }
})

///----------- api -----------\\\
export const todolistAPI = {
    getTodolist() {
        return instance.get<TodoListType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{ title: string }>>(
            `todo-lists/${todolistId}`,
            {title: title})
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponse>(
            `todo-lists/${todolistID}/tasks`)
    },
    createTasks(todolistID: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: CreateTaskType }>>>(`todo-lists/${todolistID}/tasks`, {title});
    },
    deleteTasks(taskID: string, todolistID: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTasks(todolistID: string, taskID: string, model: UpdateTasksModelType) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistID}/tasks/${taskID}`, model)
    }
}
export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<ResponseType<{ userId: string }>>>(`auth/login`, data);
    }
}

///----------- types -----------\\\
export type ResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: T
}
export type TodoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum ResultCode {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10
}

export enum ROUTS {
    DEFAULT = "/",
    LOGIN = "login",
    NOT_FOUND = "404"
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities,
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedData: string
}
export type CreateTaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities,
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedData: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTasksModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

