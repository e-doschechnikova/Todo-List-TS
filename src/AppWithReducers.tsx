import React, {useReducer} from "react";
import "./App.css";
import {TodoList} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    AppBar,
    IconButton,
    Button,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeTodoListTitleAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    AddTodoListAC,
    todolistsReducer, FilterValuesType
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskStateType = {
    [todolistID: string]: Array<TaskType>;
};

function AppWithReducers() {

    //BLL:

    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID_1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistID_2, title: "What to buy", filter: "all", addedDate: "", order: 0}
    ]);

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID_1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todolistId: todolistID_1,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS/TS", status: TaskStatuses.Completed,
                todolistId: todolistID_1,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New,
                todolistId: todolistID_1,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
        [todolistID_2]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todolistId: todolistID_2,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "Bread", status: TaskStatuses.New,
                todolistId: todolistID_2,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "Butter", status: TaskStatuses.New,
                todolistId: todolistID_2,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
    });

//tasks:

    const removeTask = (taskID: string, todolistID: string) => {
        let action = removeTaskAC(taskID, todolistID)
        dispatchToTasks(action)
    };

    const addTask = (title: string, todolistID: string) => {
        dispatchToTasks(addTaskAC(title, todolistID))
    };

    const changeTaskStatus = (taskID: string, status: TaskStatuses, todolistID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskID, status, todolistID))
    };

    const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todolistID))
    };

//todolists:

    const changeTodoListTitle = (title: string, todolistID: string) => {
        dispatchToTodolists(ChangeTodoListTitleAC(title, todolistID))
    };
    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        dispatchToTodolists(ChangeTodoListFilterAC(todolistID, filter))
    };
    const removeTodolist = (todolistID: string) => {
        let action = RemoveTodoListAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    };
    const addTodolist = (title: string) => {
        let action = AddTodoListAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    };

//UI:

    const todolistsComponents = todolists.map((tl) => {
        let tasksForRender;
        switch (tl.filter) {
            case "active":
                tasksForRender = tasks[tl.id].filter((t) => t.status === TaskStatuses.New);
                break;
            case "completed":
                tasksForRender = tasks[tl.id].filter((t) => t.status === TaskStatuses.Completed);
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

export default AppWithReducers;
