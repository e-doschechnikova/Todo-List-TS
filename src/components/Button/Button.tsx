import React from "react";

export const Button = (props: ButtonPropsType) => {

  const onClickHandler = () => {
    props.callBack();
  };

  return <button onClick={onClickHandler}>{props.name}</button>;
};

///----------- type -----------\\\
type ButtonPropsType = {
  name: string;
  callBack: () => void;
};