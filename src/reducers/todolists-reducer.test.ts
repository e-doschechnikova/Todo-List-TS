import { FilterValuesType } from "./../App";
import {
  ChangeTodoListFilterAT,
  todolistsReducer,
  ChangeTodoListTitleAT,
  RemoveTodoListAC,
} from "./todolists-reducer";
import { TodoListType } from "../App";
import { v1 } from "uuid";

test("correct todolist should be removed", () => {
  // тестовые данные:
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
  // вызов тестируемой функции:
  const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId2));
  // cверка результата c ожиданием:
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId1);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, {
    type: "ADD-TODOLIST",
    title: newTodolistTitle,
    id: v1(),
  });

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const action: ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    id: todolistId2,
    title: newTodolistTitle,
  };

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const action: ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: newFilter,
    id: todolistId2,
  };

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
