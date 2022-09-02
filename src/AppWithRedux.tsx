import React, {useCallback} from "react";
import "./App.css";
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, IconButton, Button, Toolbar, Typography, Container, Grid, Paper,} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeTodoListTitleAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    AddTodoListAC
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TaskStateType = {
    [todolistID: string]: Array<TaskType>;
};

export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {
    //BLL:
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    //tasks:

    const removeTask = (taskID: string, todolistID: string) => {
        let action = removeTaskAC(taskID, todolistID)
        dispatch(action)
    };

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [dispatch]);

    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    };

    const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todolistID))
    };

    //todolists:

    const changeTodoListTitle = (title: string, todolistID: string) => {
        dispatch(ChangeTodoListTitleAC(title, todolistID))
    };
    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        dispatch(ChangeTodoListFilterAC(todolistID, filter))
    };
    const removeTodolist = (todolistID: string) => {
        let action = RemoveTodoListAC(todolistID)
        dispatch(action)
    };
    const addTodolist = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch]);

    //UI:

    const todolistsComponents = todolists.map((tl) => {
        let tasksForRender;
        switch (tl.filter) {
            case "active":
                tasksForRender = tasks[tl.id].filter((t) => !t.isDone);
                break;
            case "completed":
                tasksForRender = tasks[tl.id].filter((t) => t.isDone);
                break;
            default:
                tasksForRender = tasks[tl.id];
        }

        return (
            <Grid item key={tl.id}>
                <Paper variant={"elevation"} style={{padding: "20px"}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForRender}
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

    //UI:
    return (
        <div className="App">
            <AppBar position={"static"} color={"transparent"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color={"secondary"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h5">Todolists</Typography>
                    <Button color={"secondary"} variant={"outlined"}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
