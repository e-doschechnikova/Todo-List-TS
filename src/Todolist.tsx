import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
// rsc
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    setLastState: () => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksJSX = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
            return (
                <li key={t.id}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={t.isDone}

                    />
                    <span className={t.isDone ? "task isDone" : "task"}>{t.title}</span>
                    <button onClick={removeTask}>х</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    const getOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter)
    }
    const onClickHandler = () => props.changeTodoListFilter("all")
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent <HTMLInputElement>) => e.key === "Enter" && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={props.setLastState}>Undo</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color: "red"}}>Title is required!</div>}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active" : ""}
                    onClick={onClickHandler}
                >All</button>
                <button
                    className={props.filter === "active" ? "active" : ""}
                    onClick={getOnClickHandler("active")}
                >Active</button>
                <button
                    className={props.filter === "completed" ? "active" : ""}
                    onClick={getOnClickHandler("completed")}
                >Completed</button>
            </div>
        </div>
    );
};

export default TodoList;