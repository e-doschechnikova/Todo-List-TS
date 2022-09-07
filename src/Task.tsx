import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {DeleteOutlineOutlined} from "@material-ui/icons";
import {TaskType} from "./Todolist/Todolist";

type TaskPropsType = {
    task: TaskType,
    removeTask: (taskID: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
    changeTaskTitle: (taskTitle: string, title: string) => void;
}

export const Task = ({task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {

    const onClickHandler = () => removeTask(task.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(task.id, e.currentTarget.checked);

    const onTitleChangeHandler = (taskTitle: string) => {
        changeTaskTitle(task.id, taskTitle,);
    };

    return (
        <ListItem
            key={task.id}
            className={task.isDone ? "task isDone" : "task"}
            alignItems={"center"}
            disableGutters={true}
            divider={true}
        >
            <Checkbox
                size={"small"}
                color={"primary"}
                onChange={onChangeHandler}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton>
                <DeleteOutlineOutlined onClick={onClickHandler}/>
            </IconButton>
        </ListItem>
    );
};

