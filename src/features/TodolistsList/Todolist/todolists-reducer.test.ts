import {
    todolistsReducer,
    ChangeTodoListTitleAT,
    RemoveTodoListAC,
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, TodoListDomainType, FilterValuesType, setTodolistsAC,
} from "./todolists-reducer";
import {v1} from "uuid";
import {TodoListType} from "../../../api/todolist-api";

let todoListId1: string
let todoListId2: string

let startState: Array<TodoListDomainType> = []

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todoListId2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ];
})
test("correct todolist should be removed", () => {

    const endState = todolistsReducer(startState, RemoveTodoListAC(todoListId2));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId1);
});

test("correct todolist should be added", () => {

    let todolist: TodoListType = {
        title: "new",
        id: "any",
        order: 0,
        addedDate: ""
    };

    const endState = todolistsReducer(
        startState,
        AddTodoListAC(todolist)
    );

    expect(endState.length).toBe(3);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined()
});


test("correct todolist should change its name", () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodoListTitleAT = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todoListId2,
        title: newTodolistTitle,
    };

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todoListId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test("correct filter of todolist should be changed", () => {

    let newFilter: FilterValuesType = "completed";

    const action = ChangeTodoListFilterAC(todoListId2, newFilter)
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test("todolists should be set to the state", () => {

    const action = setTodolistsAC(startState)
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});
