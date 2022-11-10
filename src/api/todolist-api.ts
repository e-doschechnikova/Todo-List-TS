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
        const promise = instance.get("todo-lists")
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post("todo-lists", {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(
            `todo-lists/${todolistId}`,
            {title: title})
        return promise
    }

}