import React from "react";
import "./App.css";
import {AppBar, IconButton, Button, Toolbar, Typography, Container, LinearProgress} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {RequestStatusType} from "./app-reducer";
import {useAppSelector} from "../api/store";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "../components/Error/Error404";

function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return <div className="App">
        <ErrorSnackbar/>
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
            {status === "loading" && <LinearProgress color={"secondary"}/>}
        </AppBar>
        <Container fixed>
            <Routes>
                <Route path={"/"} element={<TodolistsList/>}/>
                <Route path={"login"} element={<Login/>}/>

                <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                <Route path={"/404"} element={<Error404/>}/>
            </Routes>
        </Container>
    </div>
}

export default App;
