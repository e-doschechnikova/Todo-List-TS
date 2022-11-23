import {AddTodoListAC, TodoListDomainType, todolistsReducer} from "../todolists-reducer";
import {tasksReducer} from "../tasks-reducer";
import {TaskStateType} from "../../app/App";
import {TodoListType} from "../../api/todolist-api";


test('is should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];

    let todolist: TodoListType = {
        title: "new",
        id: "any",
        order: 0,
        addedDate: ""
    };

    const action = AddTodoListAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist);
    expect(idFromTodolists).toBe(action.todolist);
});



