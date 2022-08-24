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

///----------- test add todolist -----------\\\

test("correct todolist should be added", () => {
    // 1. test data:
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ];
    // 2. calling the function under test:
    const endState = todolistsReducer(
        startState,
        AddTodoListAC(newTodolistTitle)
    );
    // 3. checking the result with the expectation:
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

///----------- test remove todolist -----------\\\

test("correct todolist should be removed", () => {
    // 1. test data:
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ];
    // 2. calling the function under test:
    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId2));
    // 3. checking the result with the expectation:
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});

///----------- test change todolist title -----------\\\

test("correct todolist should change its name", () => {
    // 1. test data:
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ];

    const action: ChangeTodoListTitleAT = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodolistTitle,
    };
    // 2. calling the function under test:
    const endState = todolistsReducer(
        startState,
        ChangeTodoListTitleAC(newTodolistTitle, todolistId2)
    );
    // 3. checking the result with the expectation:
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

///----------- test change todolist filter -----------\\\

test("correct filter of todolist should be changed", () => {
    // 1. test data:
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ];

    const action: ChangeTodoListFilterAT = {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        filter: newFilter,
    };
    // 2. calling the function under test:
    const endState = todolistsReducer(
        startState,
        ChangeTodoListFilterAC(todolistId2, newFilter)
    );
    // 3. checking the result with the expectation:
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
