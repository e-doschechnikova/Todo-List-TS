export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    isInitialized: false,
    status: "loading" as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.value}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

///----------- action creators -----------\\\
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (value: string | null) => ({type: "APP/SET-ERROR", value} as const)
export const setIsInitializedAppAC = (isInitialized: boolean) =>
    ({type: "APP/SET-IS-INITIALIZED", isInitialized} as const)

///----------- type -----------\\\
type InitialStateType = typeof initialState
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedAppType = ReturnType<typeof setIsInitializedAppAC>
type ActionsType = SetAppStatusType | SetAppErrorType | SetIsInitializedAppType