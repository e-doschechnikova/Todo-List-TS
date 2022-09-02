import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./Todolist/Todolist";

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

// CRUD
// create ++
// read ++
// update +
// delete ++

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TaskStateType = {
    [todolistID: string]: Array<TaskType>;
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    //BLL:

    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ]);

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Butter", isDone: false},
        ],
    });

    //functions:

    //tasks:

    const removeTask = (taskID: string, todolistID: string) => {
        const copyTasks = {...tasks};
        copyTasks[todolistID] = tasks[todolistID].filter((t) => t.id !== taskID);
        setTasks(copyTasks);
        /*setTasks({...tasks, [todolistID]:tasks[todolistID].filter(t => t.id !== taskID)})*/
    };
    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        };
        const copyTasks = {...tasks};
        copyTasks[todolistID] = [newTask, ...tasks[todolistID]];
        setTasks(copyTasks);
        /*setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]})*/
    };
    const changeTaskStatus = (
        taskID: string,
        isDone: boolean,
        todolistID: string
    ) => {
        const copyTasks = {...tasks};
        copyTasks[todolistID] = tasks[todolistID].map((t) =>
            t.id === taskID ? {...t, isDone: isDone} : t
        );
        setTasks(copyTasks);
        /*setTasks({...tasks, [todolistID]:tasks[todolistID].map(t=>t.id === taskID ? {...t, isDone:isDone} : t)})*/
    };
    const changeTaskTitle = (
        taskID: string,
        title: string,
        todolistID: string
    ) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map((t) =>
                t.id === taskID ? {...t, title: title} : t
            ),
        });
        /*setTasks({...tasks, [todolistID]:tasks[todolistID].map(t=>t.id === taskID ? {...t, isDone:isDone} : t)})*/
    };

//todolists:
    //1. Get new state -> !!!!!!
    //2. Set new state

    const changeTodoListTitle = (title: string, todolistID: string) => {
        /* const copyTodolists = todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl)
             setTodolists(copyTodolists)*/
        setTodolists(
            todolists.map((tl) =>
                tl.id === todolistID ? {...tl, title: title} : tl
            )
        );
    };
    const changeTodoListFilter = (
        filter: FilterValuesType,
        todolistID: string
    ) => {
        /* const copyTodolists = todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl)
             setTodolists(copyTodolists)*/
        setTodolists(
            todolists.map((tl) =>
                tl.id === todolistID ? {...tl, filter: filter} : tl
            )
        );
    };
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter((tl) => tl.id !== todolistID));
        delete tasks[todolistID];

        /*const copyTasks = {...tasks}
            delete copyTasks[todolistID]
            setTasks(copyTasks)*/
    };
    const addTodolist = (title: string) => {
        const newTodoListID = v1();
        /*const newTodolist: TodoListType = {
                id: newTodoListID,
                title: title,
                filter: "all"
            }*/
        /*setTodolists([newTodolist, ...todolists])*/
        setTodolists([{id: newTodoListID, title, filter: "all"}, ...todolists]);
        setTasks({...tasks, [newTodoListID]: []});
    };

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

export default App;
