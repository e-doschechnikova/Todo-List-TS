import React from "react";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: "TODOLISTS/EditableSpan",
    component: EditableSpan,
    argsType: {
        onClick: {
            description: "Button clicked inside form"
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    changeTitle: action("EditableSpan value changed")
}