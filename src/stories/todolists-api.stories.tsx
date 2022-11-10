import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
       todolistAPI.getTodolist().then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        todolistAPI.createTodolist("NEW TODOLIST").then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        const todolistId = "44ebc1a1-70eb-48e8-a616-f0b82fa1d922"
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        const todolistId = "1018d727-69ee-4dca-8c20-7a5c0bfbf4bd"
        todolistAPI.updateTodolist(todolistId, "SOME NEW TITLE").then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

