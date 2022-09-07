import React, {ChangeEvent, memo, useCallback} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
} from "@material-ui/core";
import {DeleteOutlineOutlined} from "@material-ui/icons";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

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
        isDone: boolean,
        todolistID: string
    ) => void;

    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void;
    changeTodoListTitle: (title: string, todolistID: string) => void;

    removeTodolist: (todolistID: string) => void;
};

export const TodoList = memo((props: TodoListPropsType) => {
    console.log("Todolist")
    let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true)
    }

    const tasksJSX = props.tasks.length ? (
        tasks.map((t) => {
            const removeTask = () => props.removeTask(t.id, props.id);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);

            const changeTaskTitle = (taskTitle: string) => {
                props.changeTaskTitle(t.id, taskTitle, props.id);
            };

            // return (
                // <ListItem
                //     key={t.id}
                //     className={t.isDone ? "task isDone" : "task"}
                //     alignItems={"center"}
                //     disableGutters={true}
                //     divider={true}
                // >
                //     <Checkbox
                //         size={"small"}
                //         color={"primary"}
                //         onChange={changeTaskStatus}
                //         checked={t.isDone}
                //     />
                //     <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                //     <IconButton>
                //         <DeleteOutlineOutlined onClick={removeTask}/>
                //     </IconButton>
                // </ListItem>
            // );
        })
    ) : (
        <span>Your taskslist is empty</span>
    );
    const createOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.id);
    };
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id]);
    const removeTodolist = () => props.removeTodolist(props.id);
    const changeTodoListTitle = (todolistTitle: string) =>
        props.changeTodoListTitle(todolistTitle, props.id);

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton>
                    <DeleteOutlineOutlined color={"primary"} onClick={removeTodolist}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List style={{listStyle: "none"}}>{tasksJSX}</List>
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

