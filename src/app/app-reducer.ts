export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "loading" as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

///----------- actions -----------\\\
export const setAppStatus = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)

///----------- type -----------\\\
type InitialStateType = typeof initialState
export type SetAppStatusType = ReturnType<typeof setAppStatus>
type ActionsType = SetAppStatusType