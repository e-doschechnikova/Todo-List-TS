import React, {useEffect} from "react";
import "./App.css";
import {AppBar, IconButton, Button, Toolbar, Typography, Container, LinearProgress} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {RequestStatusType} from "./app-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../api/store";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "../components/Error/Error404";
import {initializeAppTC, logOutTC} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";

function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state => state.app.isInitialized))
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const logOut = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color={"secondary"}/>
        </div>
    }

    return <div className="App">
        <ErrorSnackbar/>
        <AppBar position={"static"} color={"transparent"}>
            <Toolbar style={{justifyContent: "space-between"}}>
                <IconButton edge={"start"} color={"secondary"} aria-label={"menu"}>
                    <Menu/>
                </IconButton>
                <Typography variant="h5">Todolists</Typography>
                {isLoggedIn && <Button onClick={logOut} color={"secondary"} variant={"outlined"} >Log out</Button>}
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
