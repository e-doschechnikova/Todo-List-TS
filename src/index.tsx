import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {createTheme, ThemeProvider} from "@material-ui/core";
import {indigo, pink} from "@material-ui/core/colors";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import { store } from "./reducers/store";

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        type: "light",
    },
});

ReactDOM.render(
    <Provider store={store}> <ThemeProvider theme={theme}>
        <AppWithRedux/>
    </ThemeProvider>
    </Provider>, document.getElementById("root")
);
// App()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
