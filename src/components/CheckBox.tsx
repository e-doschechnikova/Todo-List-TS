import React, { ChangeEvent } from "react";

type CheckBoxPropsType = {
  checked: boolean;
  callback: (eventValue: boolean) => void;
};

export const CheckBox = (props: CheckBoxPropsType) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.callback(event.currentTarget.checked);
  };
  return (
    <input type="checkbox" checked={props.checked} onChange={onChangeHandler} />
  );
};
