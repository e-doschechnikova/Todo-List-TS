import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {DeleteOutlineOutlined} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType} from "./todolists-reducer";
import {fetchTasksTC} from "./Task/tasks-reducer";
import {useAppDispatch} from "../../../api/store";
import {Task} from "./Task/Task";
import {RequestStatusType} from "../../../app/app-reducer";

export const TodoList = memo((props: TodoListPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const createOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.id);
    };
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id]);
    const removeTodolist = () => props.removeTodolist(props.id);
    const changeTodoListTitle = (todolistTitle: string) =>
        props.changeTodoListTitle(todolistTitle, props.id);
    const taskJSX = tasksForTodolist.length ?
        tasksForTodolist.map(t => <Task key={t.id} task={t} todolistID={props.id} removeTask={props.removeTask}
                                        changeTaskTitle={props.changeTaskTitle}
                                        changeTaskStatus={props.changeTaskStatus}
        />) : <span>I"m empty! Fill me up! <b>㋡</b></span>

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton disabled={props.entityStatus === "loading"}>
                    <DeleteOutlineOutlined color={"primary"} onClick={removeTodolist}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List style={{listStyle: "none"}}>
                {taskJSX}
            </List>
            <div>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={createOnClickHandler("all")}
                    style={{margin: "5px"}}
                    /* onClick={() => props.changeTodoListFilter("all", props.id)}*/
                >
                    All
                </Button>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={createOnClickHandler("active")}
                    style={{margin: "5px"}}
                >
                    Active
                </Button>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
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
    id: string;
    title: string;
    tasks: TaskType[];
    filter: FilterValuesType;
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