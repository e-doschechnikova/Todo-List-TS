import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../redux/ReduxStoreProviderDecorator";

export default {
    title: "TODOLISTS/App",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) =>  <App/>;

export const AppBaseExampleStory = Template.bind({});

AppBaseExampleStory.args = {};




