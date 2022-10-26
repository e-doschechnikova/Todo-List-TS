import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={store}>{storyFn()}</Provider>
};
