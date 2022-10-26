import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {Task} from "../Todolist/Task/Task";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../redux/ReduxStoreProviderDecorator";

export default {
    title: "TODOLISTS/Task",
    component: Task,
    decorators: [ReduxStoreProviderDecorator],

    args: {
        changeTaskStatus: action("changeTaskStatus"),
        changeTaskTitle: action("changeTaskTitle"),
        removeTask: action("removeTask"),
        todolistID: "aaa"
    }

} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task: {id: "1", title: "JS", isDone: true},
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {id: "2", title: "Milk", isDone: false},

};


