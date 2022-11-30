import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {DeleteOutlineOutlined} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType, TodoListDomainType} from "./todolists-reducer";
import {fetchTasksTC} from "./Task/tasks-reducer";
import {useAppDispatch} from "../../../api/store";
import {Task} from "./Task/Task";
import {RequestStatusType} from "../../../app/app-reducer";

export const TodoList = memo((props: TodoListPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const createOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.todolist.id);
    };
    const addTask = useCallback((title: string) => props.addTask(title, props.todolist.id), [props.addTask, props.todolist.id]);
    const removeTodolist = () => props.removeTodolist(props.todolist.id);
    const changeTodoListTitle = (todolistTitle: string) =>
        props.changeTodoListTitle(todolistTitle, props.todolist.id);
    const taskJSX = tasksForTodolist.length ?
        tasksForTodolist.map(t => <Task key={t.id} task={t} todolistID={props.todolist.id} removeTask={props.removeTask}
                                        changeTaskTitle={props.changeTaskTitle}
                                        changeTaskStatus={props.changeTaskStatus}
        />) : <span>I"m empty! Fill me up! <b>㋡</b></span>

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} changeTitle={changeTodoListTitle}/>
                <IconButton disabled={props.entityStatus === "loading"}>
                    <DeleteOutlineOutlined color={"primary"} onClick={removeTodolist}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.entityStatus === "loading"}/>
            <List style={{listStyle: "none"}}>
                {taskJSX}
            </List>
            <div>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.todolist.filter === "all" ? "secondary" : "primary"}
                    onClick={createOnClickHandler("all")}
                    style={{margin: "5px"}}
                    /* onClick={() => props.changeTodoListFilter("all", props.id)}*/
                >
                    All
                </Button>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.todolist.filter === "active" ? "secondary" : "primary"}
                    onClick={createOnClickHandler("active")}
                    style={{margin: "5px"}}
                >
                    Active
                </Button>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.todolist.filter === "completed" ? "secondary" : "primary"}
                    onClick={createOnClickHandler("completed")}
                    style={{margin: "5px"}}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
})

///----------- type -----------\\\
type TodoListPropsType = {
    todolist: TodoListDomainType,
    tasks: TaskType[];
    addTask: (title: string, todolistID: string) => void;
    removeTask: (taskID: string, todolistID: string) => void;
    changeTaskTitle: (
        taskTitle: string,
        title: string,
        todolistID: string
    ) => void;
    changeTaskStatus: (
        taskID: string,
        todolistID: string,
        status: TaskStatuses
    ) => void;
    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void;
    changeTodoListTitle: (title: string, todolistID: string) => void;
    removeTodolist: (todolistID: string) => void;
    entityStatus: RequestStatusType
};