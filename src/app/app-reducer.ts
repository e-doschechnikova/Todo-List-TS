import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isInitialized: false,
    status: "loading" as RequestStatusType,
    error: null as null | string
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setIsInitializedAppAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer

export const {setAppStatusAC, setAppErrorAC, setIsInitializedAppAC} = slice.actions//(status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)

///----------- type -----------\\\
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
type InitialStateType = typeof initialState
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>

