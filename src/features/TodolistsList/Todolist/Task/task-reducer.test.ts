import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";
import {TaskStateType} from "../../../../app/App";

let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todoListId: "todoListId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                todoListId: "todoListId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todoListId: "todoListId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        "todoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: "todoListId2",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                todoListId: "todoListId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todoListId: "todoListId2",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    };

})

test("correct task should be deleted from correct array", () => {

    const action = removeTaskAC("2", "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todoListId: "todoListId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                todoListId: "todoListId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todoListId: "todoListId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        "todoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: "todoListId2",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todoListId: "todoListId2",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    });

});

test("correct task should be added to correct array", () => {

    const action = addTaskAC({
        id: "3", title: "tea", status: TaskStatuses.New,
        todoListId: "fffff",
        description: "",
        startDate: "",
        deadline: "",
        addedData: "",
        order: 0,
        priority: TaskPriorities.Low
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("juce");
    expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
})

test("status of specified task should be changed", () => {

    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
});

test("title of specified task should be changed", () => {

    const action = updateTaskAC("2", {title: "yoyoyo"}, "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].title).toBe("yoyoyo");
    expect(endState["todoListId1"][1].title).toBe("JS");
});

test("new array should be added when new todolist is added", () => {

    const action = AddTodoListAC({
        id: "blabla",
        title: "todo new",
        addedDate: "",
        order: 0,
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(endState[newKey]).toEqual([]);
});


test("property with todoListId should be deleted", () => {

    const action = RemoveTodoListAC("todoListId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(endState["todoListId2"]).not.toBeDefined();
});




