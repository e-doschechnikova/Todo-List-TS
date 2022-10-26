import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@material-ui/core";
import {AddOutlined} from "@material-ui/icons";

export default {
    title: "TODOLISTS/AddItemForm",
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: "Button clicked inside form"
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;
export const AddItemFormStory = Template.bind({});

const Template1: ComponentStory<typeof AddItemForm> = (args) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>("Title is required!");

    const addItem = () => {
        if (title.trim() !== "") {
            args.addItem(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItem()
        }
    }
    return <div>
        <TextField
            variant={"outlined"}
            size={"small"}
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            label={"Add title"}
            error={!!error}
            helperText={error && "Title is required!"}
        />
        <IconButton color={"secondary"}>
            <AddOutlined/>
        </IconButton>
    </div>
}

export const AddItemFormStoryError = Template1.bind({});

AddItemFormStory.args = {
    addItem: action("Button clicked inside form")
};

