import {tasksReducer} from "../features/TodolistsList/Todolist/Task/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../app/app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store;

///----------- types -----------\\\
export type AppRootStateType = ReturnType<typeof rootReducer>
type AppDispatchType = ThunkDispatch<AppRootStateType, void, AnyAction>

