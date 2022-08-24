import {FilterValuesType} from "./../App";
import {
    ChangeTodoListFilterAT,
    todolistsReducer,
    ChangeTodoListTitleAT,
    RemoveTodoListAC,
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
} from "./todolists-reducer";
import {TodoListType} from "../App";
import {v1} from "uuid";

let todolistId1 = v1();
let todolistId2 = v1();

const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
];

test("correct todolist should be added", () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(
        startState,
        AddTodoListAC(newTodolistTitle)
    );

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should be removed", () => {

    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId2));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});

test("correct todolist should change its name", () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodoListTitleAT = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodolistTitle,
    };

    const endState = todolistsReducer(
        startState,
        ChangeTodoListTitleAC(newTodolistTitle, todolistId2)
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test("correct filter of todolist should be changed", () => {

    let newFilter: FilterValuesType = "completed";

    const action: ChangeTodoListFilterAT = {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        filter: newFilter,
    };

    const endState = todolistsReducer(
        startState,
        ChangeTodoListFilterAC(todolistId2, newFilter)
    );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
