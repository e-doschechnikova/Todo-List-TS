import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";
import {TaskStateType} from "../../../../app/App";

let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todolistId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todolistId: "todolistId2",
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

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todolistId: "todolistId1",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todolistId: "todolistId2",
                description: "",
                startDate: "",
                deadline: "",
                addedData: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todolistId: "todolistId2",
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

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test("status of specified task should be changed", () => {

    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test("title of specified task should be changed", () => {

    const action = updateTaskAC("2", {title: "yoyoyo"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("yoyoyo");
    expect(endState["todolistId1"][1].title).toBe("JS");
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
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(endState[newKey]).toEqual([]);
});


test("property with todolistId should be deleted", () => {

    const action = RemoveTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(endState["todolistId2"]).not.toBeDefined();
});




