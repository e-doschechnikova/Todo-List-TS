import { todolistsReducer } from "./todolists-reducer";
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
  const endState = todolistsReducer(startState, {
    type: "REMOVE-TODOLIST",
    id: todolistId2,
  });
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
