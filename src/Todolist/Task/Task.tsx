import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {DeleteOutlineOutlined} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTaskTC} from "../../reducers/tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {useAppDispatch} from "../../redux/store";

export type TaskPropsType = {
    task: TaskType,
    todolistID: string,
    removeTask: (taskID: string, todolistID: string) => void;
    changeTaskTitle: (taskTitle: string, title: string, todolistID: string) => void;
    changeTaskStatus: (taskID: string, todolistID: string, status: TaskStatuses) => void;
}

export const
    Task = memo(({task, todolistID, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
        const {id, status, title} = {...task}

        const onClickHandler = useCallback(() => removeTask(task.id, todolistID), [task.id, todolistID])

        const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            changeTaskStatus(id, todolistID, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,)
        }, [task.id, todolistID])

        const onTitleChangeHandler = useCallback((newValue: string) => {
            changeTaskTitle(id, newValue, todolistID)
        }, [task.id, todolistID])

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
