import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer"
import {Dispatch} from "redux"
import {ResponseType} from "../api/todolist-api";


///----------- generic function -----------\\\
export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: "Some error occurred"}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleServerNetWorkError = (dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : "Some error occurred"}))
    dispatch(setAppStatusAC({status: "failed"}))
}

///----------- types -----------\\\}
type ErrorUtilsDispatchType = Dispatch<SetAppStatusType | SetAppErrorType>