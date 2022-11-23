import {TextField} from "@material-ui/core";
import React, {ChangeEvent, useState, KeyboardEvent, memo} from "react";

export const EditableSpan = memo(({title, changeTitle}: EditableSpanPropsType) => {

    const [text, setText] = React.useState<string>(title);
    const [editMode, setEditMode] = useState<boolean>(false);

    const onChangeSetText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
    };
    const onKeyDownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === "Enter" && offEditMode();
    const onEditMode = () => {
        setEditMode(true);
    };
    const offEditMode = () => {
        setEditMode(false);
        changeTitle(text);
    };

    return editMode ? (
        <TextField
            color={"primary"}
            value={text}
            onChange={onChangeSetText}
            onKeyDown={onKeyDownChangeTitle}
            onBlur={offEditMode}
            autoFocus
        />
    ) : (
        <span onDoubleClick={onEditMode}>{title}</span>
    );
});

///----------- type -----------\\\
type EditableSpanPropsType = {
    title: string;
    changeTitle: (editedTitle: string) => void;
};