import React, {ChangeEvent} from "react";

export const Checkbox = (props: CheckboxPropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }

    return (
        <div>
            <input type="checkbox" checked={props.checked}
                   onChange={onChangeHandler}/>
        </div>
    );
};

///----------- type -----------\\\
type CheckboxPropsType = {
    checked: boolean
    callback: (eventValue: boolean) => void
}