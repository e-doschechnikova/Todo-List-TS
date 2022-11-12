import React, {useState} from "react";
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
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodoListDomainType} from "./reducers/todolists-reducer";


export type TaskStateType = {
    [todolistID: string]: Array<TaskType>;
};

function App() {

    //BLL:

    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const [todolists, setTodolists] = useState<Array<TodoListDomainType>>([
        {id: todolistID_1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistID_2, title: "What to buy", filter: "all", addedDate: "", order: 1},
    ]);

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todolistId: todolistID_1,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS/TS", status: TaskStatuses.Completed, todolistId: todolistID_1,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New, todolistId: todolistID_1,
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
                id: v1(), title: "Milk", status: TaskStatuses.Completed, todolistId: todolistID_2,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "Bread", status: TaskStatuses.New, todolistId: todolistID_2,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "Butter", status: TaskStatuses.New, todolistId: todolistID_2,
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
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
            status: TaskStatuses.New,
            todolistId: todolistID,
            description: "",
            startDate: "",
            deadline: "",
            addedData: "",
            order: 0,
            priority: TaskPriorities.Low
        };
        const copyTasks = {...tasks};
        copyTasks[todolistID] = [newTask, ...tasks[todolistID]];
        setTasks(copyTasks);
        /*setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]})*/
    };
    const changeTaskStatus = (
        taskID: string,
        status: TaskStatuses,
        todolistID: string
    ) => {
        const copyTasks = {...tasks};
        copyTasks[todolistID] = tasks[todolistID].map((t) =>
            t.id === taskID ? {...t, status: status} : t
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
        setTodolists([{id: newTodoListID, title, filter: "all", addedDate: "", order: 0}, ...todolists]);
        setTasks({...tasks, [newTodoListID]: []});
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

export default App;
