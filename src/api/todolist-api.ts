import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': 'db8dc4ac-96a4-47c2-bbe3-e2d620ac2a1e',
    }
})


export const todolistAPI = {
    getTodolist() {
        const promise = instance.get<TodoListType[]>("todo-lists")
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(
            `todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks/`, {title: taskTitle})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<UpdateTasksType>(
            `todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, model: UpdateTasksType) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

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

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type UpdateTasksType = {
    title: string
    description: string
    // completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}