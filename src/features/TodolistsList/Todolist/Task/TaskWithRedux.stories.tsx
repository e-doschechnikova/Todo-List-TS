import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {Task, TaskPropsType} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../app/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../api/store";
import {TaskType} from "../../../../api/todolist-api";

export default {
    title: "TODOLISTS/Task with Redux",
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof TaskWithRedux>;

const TaskWithRedux = (props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistId1"][0])
    return <Task task={task} todolistID={"todolistId1"} removeTask={props.removeTask}
                 changeTaskTitle={props.changeTaskTitle}
                 changeTaskStatus={props.changeTaskStatus}/>
}

// const Template: ComponentStory<typeof TaskWithRedux> = (args) => {
//     return <TaskWithRedux/>
// }
//
//
// export const TaskWithReduxExample = Template.bind({});






