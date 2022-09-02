import {IconButton, TextField} from "@material-ui/core";
import {AddOutlined} from "@material-ui/icons";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [title, setTitle] = React.useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false);
    };
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && onClickAddItem();

    const onClickAddItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle("");
    };

    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                label={"Add title"}
                error={error}
                helperText={error && "Title is required!"}
            />
            <IconButton color={"secondary"}>
                <AddOutlined onClick={onClickAddItem}/>
            </IconButton>
        </div>
    );
})  ;
