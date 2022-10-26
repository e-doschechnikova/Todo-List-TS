import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../Todolist/Task/Task";
import {action} from "@storybook/addon-actions";
import {Provider} from "react-redux";
import {store} from "../redux/store";

export default {
    title: 'TODOLISTS/Task',
    component: Task,

    args: {
        changeTaskStatus: action("changeTaskStatus"),
        changeTaskTitle: action("changeTaskTitle"),
        removeTask: action("removeTask"),
        todolistID: "aaa"
    }

} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Provider store={store}><Task {...args} /></Provider>;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task: {id: "1", title: "JS", isDone: true},
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {id: "2", title: "Milk", isDone: false},

};


