import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {DeleteOutlineOutlined} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

export type TaskPropsType = {
    task: TaskType,
    todolistID: string,
    removeTask: (taskID: string, todolistID: string) => void;
    changeTaskTitle: (taskTitle: string, title: string, todolistID: string) => void;
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void;
}

export const
    Task = memo(({task, todolistID}: TaskPropsType) => {

    const {id, status, title} = {...task}

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(id, todolistID))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistID))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistID))
    };

    return (
        <ListItem
            key={id}
            className={status === TaskStatuses.Completed ? "task isDone" : ""}
            alignItems={"center"}
            disableGutters={true}
            divider={true}
        >
            <Checkbox
                size={"small"}
                color={"primary"}
                onChange={onChangeHandler}
                checked={status === TaskStatuses.Completed}
            />
            <EditableSpan title={title} changeTitle={onTitleChangeHandler}/>
            <IconButton>
                <DeleteOutlineOutlined onClick={onClickHandler}/>
            </IconButton>
        </ListItem>
    );
});
