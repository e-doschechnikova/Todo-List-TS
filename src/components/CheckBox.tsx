import React, {ChangeEvent} from 'react';

type CheckboxPropsType = {
    checked: boolean
    callback: (eventValue: boolean) => void
}

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

