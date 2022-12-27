import {Dispatch} from "redux"
import {setAppStatusAC, setIsInitializedAppAC} from '../../app/app-reducer'
import {LoginDataType} from "./Login";
import {authAPI, ResultCode} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetWorkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})


export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

///----------- thunks creators -----------\\\
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const response = await authAPI.login(data)
        if (response.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (e) {
        handleServerNetWorkError(dispatch, e as { message: string })
    }
}
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatusAC({status: "succeeded"}))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (e) {
        handleServerNetWorkError(dispatch, e as { message: string })
    } finally {
        dispatch(setIsInitializedAppAC({value: true}));
    }

}
export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const response = await authAPI.logOut()
        if (response.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC({value: false}));
            dispatch(setAppStatusAC({status: "succeeded"}))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (e) {
        handleServerNetWorkError(dispatch, e as { message: string })
    }

}
