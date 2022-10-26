import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {DeleteOutlineOutlined} from "@material-ui/icons";
import {TaskType} from "../Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasks-reducer";

type TaskPropsType = {
    task: TaskType,
    todolistID: string
}

export const Task = memo(({task, todolistID}: TaskPropsType) => {

    const {id, isDone, title} = {...task}

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(id, todolistID))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistID))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistID))
    };

    return (
        <ListItem
            key={id}
            className={isDone ? "task isDone" : "task"}
            alignItems={"center"}
            disableGutters={true}
            divider={true}
        >
            <Checkbox
                size={"small"}
                color={"primary"}
                onChange={onChangeHandler}
                checked={isDone}
            />
            <EditableSpan title={title} changeTitle={onTitleChangeHandler}/>
            <IconButton>
                <DeleteOutlineOutlined onClick={onClickHandler}/>
            </IconButton>
        </ListItem>
    );
});

