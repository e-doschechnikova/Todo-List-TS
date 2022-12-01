import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {createTheme, ThemeProvider} from "@material-ui/core";
import {indigo, pink} from "@material-ui/core/colors";
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "./api/store";
import {BrowserRouter} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        type: "light",
    },
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>, document.getElementById("root")
);

serviceWorker.unregister();
