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
        const promise = instance.get<TodolistType[]>("todo-lists")
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
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
    }
}

export type ResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: T
}

type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}

