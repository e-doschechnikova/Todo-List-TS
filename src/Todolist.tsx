import React from "react";

type TodolistPropsType = {
    title: string,
    tasks: Array<TasksPropsType>
}

export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

export function Todolist(props: TodolistPropsType) { // props = { title: "What to learn", tasks: []
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>)
}

