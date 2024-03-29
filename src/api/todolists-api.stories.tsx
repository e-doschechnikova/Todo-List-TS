import React, {useEffect, useState} from "react"
import {todolistAPI} from "./todolist-api";
import {Description} from "@material-ui/icons";

export default {
    title: "API"
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
        const todoListId = "44ebc1a1-70eb-48e8-a616-f0b82fa1d922"
        todolistAPI.deleteTodolist(todoListId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
        const todoListId = "1018d727-69ee-4dca-8c20-7a5c0bfbf4bd"
        todolistAPI.updateTodolist(todoListId, "SOME NEW TITLE").then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>()
    const [todoListId, setTodolistId] = useState<string>("")

    const getTasks = () => {
        todolistAPI.getTasks(todoListId).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todoListId"} value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}></input>
            <button onClick={getTasks}>get task</button>
        </div>
    </div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>()
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [todoListId, setTodolistId] = useState<string>("")

    const createTasks = () => {
        todolistAPI.createTasks(todoListId, taskTitle).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todoListId"} value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}></input>
            <input placeholder={"taskTitle"} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}></input>
            <button onClick={createTasks}>create task</button>
        </div>
    </div>
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>()
    const [taskId, setTaskId] = useState<string>("")
    const [todoListId, setTodolistId] = useState<string>("")

    const deleteTasks = () => {
        todolistAPI.deleteTasks(todoListId, taskId).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todoListId"} value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}></input>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}></input>
            <button onClick={deleteTasks}>delete task</button>
        </div>
    </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>()
    const [title, setTitle] = useState<string>("TITLE ONE")
    const [description, setDescription] = useState<string>("DESCRIPTION ONE")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")
    const [todoListId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const updateTasks = () => {
        todolistAPI.updateTasks(todoListId, taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        }).then((res) => {
            setState(res.data)
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}></input>
            <input placeholder={"todoListId"} value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}></input>
            <input placeholder={"taskTitle"} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}></input>
            <input placeholder={"description"} value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}></input><
            input placeholder={"status"} value={status} onChange={(e) => {
            setStatus(+e.currentTarget.value)
        }}></input>
            <input placeholder={"priority"} value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}></input>
            <input placeholder={"startDate"} value={startDate} onChange={(e) => {
                setStartDate(e.currentTarget.value)
            }}></input>
            <input placeholder={"deadline"} value={deadline} onChange={(e) => {
                setDeadline(e.currentTarget.value)
            }}></input>
            <button onClick={updateTasks}>update task</button>
        </div>
    </div>
}



