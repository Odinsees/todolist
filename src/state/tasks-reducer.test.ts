import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addTaskAC, removeTaskAC, TasksReducer} from "./tasks-reducer";
import {addTodolistAC} from "./todolists-reducer";

test('correct new task array should be added when new todolist added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let NewTodolistID = v1();

    let startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    }

    const endState = TasksReducer(startState, addTodolistAC("New Todolist", NewTodolistID))

    expect(Object.keys(endState).length).toBe(3)
    expect(endState[NewTodolistID]).toEqual([])

})

test('correct task  should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTaskText = "Hello men"

    let startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    }

    const endState = TasksReducer(startState, addTaskAC(todolistId1,newTaskText))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe(newTaskText)

})

test('correct task  should be remove', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    }

    const endState = TasksReducer(startState, removeTaskAC(todolistId1,startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1].every(f=>f.id !==startState[todolistId1][0].id)).toBeTruthy()

})