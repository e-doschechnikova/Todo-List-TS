import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {Task} from "../Todolist/Task/Task";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../redux/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

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
    task: {
        id: "1", title: "JS", status: TaskStatuses.Completed,
        todolistId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedData: "",
        order: 0,
        priority: TaskPriorities.Low
    },
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {
        id: "2", title: "Milk", status: TaskStatuses.New, todolistId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedData: "",
        order: 0,
        priority: TaskPriorities.Low
    },

};


