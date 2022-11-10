import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'db8dc4ac-96a4-47c2-bbe3-e2d620ac2a1e'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: "newTodolistOne"}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        const todolistId = "1aa21a05-0ca9-4e37-8635-3130d3187f08"
        axios.delete(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        const todolistId = "8671f680-8cc0-4e92-a89a-48aa7a69a8f1"
        axios.put(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`, {title: "REACT!"},
            settings
        )
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

