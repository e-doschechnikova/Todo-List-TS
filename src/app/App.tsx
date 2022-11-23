import React from "react";
import "./App.css";
import {AppBar, IconButton, Button, Toolbar, Typography, Container} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";

function App() {

    return <div className="App">
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
            <TodolistsList/>
        </Container>
    </div>

}

export default App;
