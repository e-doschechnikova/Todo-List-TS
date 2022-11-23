import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../api/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/Todolist/Task/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todolistId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                todolistId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)
export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};
