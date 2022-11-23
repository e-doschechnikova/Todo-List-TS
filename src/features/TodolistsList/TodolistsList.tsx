import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {
    addTodolistTC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodoListDomainType
} from "./Todolist/todolists-reducer";
import {AppRootStateType, useAppDispatch} from "../../api/store";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./Todolist/Task/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";

export const TodolistsList = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    ///----------- tasks -----------\\\
    const removeTask = useCallback((taskID: string, todolistID: string) => {
        dispatch(removeTaskTC(taskID, todolistID))
    }, [dispatch]);
    const addTask = useCallback((taskTitle: string, todolistID: string,) => {
        dispatch(addTaskTC(taskTitle, todolistID))
    }, [dispatch]);
    const changeTaskStatus = useCallback((taskID: string, todolistID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(taskID, todolistID, {status}))
    }, [dispatch]);
    const changeTaskTitle = useCallback((taskID: string, title: string, todolistID: string) => {
        dispatch(updateTaskTC(taskID, todolistID, {title}))
    }, [dispatch]);

    ///----------- todolists -----------\\\
    const changeTodoListTitle = useCallback((title: string, todolistID: string) => {
        let thunk = ChangeTodoListTitleTC(title, todolistID)
        dispatch(thunk)
    }, [dispatch]);
    const changeTodoListFilter = useCallback((filter: FilterValuesType, todolistID: string) => {
        dispatch(ChangeTodoListFilterAC(todolistID, filter))
    }, [dispatch]);
    const removeTodolist = useCallback((todolistID: string) => {
        let thunk = removeTodolistTC(todolistID)
        dispatch(thunk)
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        let thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch]);

    const todolistsComponents = todolists.map((tl) => {
        let allTodolistTask = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper variant={"elevation"} style={{padding: "20px"}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        tasks={allTodolistTask}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        );
    });

    return (
        <>
            <Grid container style={{padding: "20px 0"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {todolistsComponents}
            </Grid>
        </>
    )
}