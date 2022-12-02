import {Dispatch} from "redux"
import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from '../../app/app-reducer'
import {LoginDataType} from "./Login";
import {authAPI, ResultCode} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetWorkError} from "../../utils/error-utils";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
///----------- actions creators -----------\\\
export const setIsLoggedInAC = (value: boolean) =>
    ({type: "login/SET-IS-LOGGED-IN", value} as const)

///----------- thunks creators -----------\\\
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const response = await authAPI.login(data)
        if (response.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(dispatch, response.data)
        }
    } catch (e) {
        handleServerNetWorkError(dispatch, e as { message: string })
    }
}

///----------- type -----------\\\
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusType | SetAppErrorType