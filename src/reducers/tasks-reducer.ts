import {TaskStateType} from "../App";

///----------- type for action type -----------\\\

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>

export type SecondAT = ReturnType<typeof>

type ActionsType = RemoveTaskAT | SecondAT


// function:
// тип действия + необходимые данные для этого действия

// @ts-ignore
export const tasksReducer = (
    state: TaskStateType,
    action: ActionsType
): TaskStateType => {
    switch (action.type) {
        case "":
            return state
        case "":
            return state
        default:
            return state
    }
};

// Action Creators:

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const

};

export const SecondAC = (title: string): SecondAT => ({
    type: ""
});


