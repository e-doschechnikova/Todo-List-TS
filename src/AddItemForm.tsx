import { IconButton } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormPropsType> = ({ addItem }) => {
  const [title, setTitle] = React.useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    error && setError(false);
  };
  const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && onClickAddItem();

  const onClickAddItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      addItem(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle("");
  };

  return (
    <div>
      <input
        value={title}
        onChange={onChangeSetTitle}
        onKeyDown={onKeyDownAddItem}
        className={error ? "error" : ""}
      />
      <IconButton>
        <AddOutlined onClick={onClickAddItem} />
      </IconButton>
      {error && <div style={{ color: "red" }}>Title is required!</div>}
    </div>
  );
};
