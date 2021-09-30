import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addTaskAC, changeCheckedAC, removeTaskAC, renameTaskAC, TasksReducer} from "./tasks-reducer";
import {addTodolistAC} from "./todolists-reducer";

test('correct new task array should be added when new todolist added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistID = v1()

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

    const endState = TasksReducer(startState, addTodolistAC("New Todolist", newTodolistID))

    let key = Object.keys(endState)
    let newKey = key.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('new key should be added!')
    }
    expect(Object.keys(endState).length).toBe(3)
    expect(endState[newKey]).toEqual([])

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

    const endState = TasksReducer(startState, addTaskAC(todolistId1, newTaskText))

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

    const endState = TasksReducer(startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1].every(f => f.id !== startState[todolistId1][0].id)).toBeTruthy()

})

test ('correct task isDone should be changed',()=>{
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

    let taskID = startState[todolistId1][0].id
    let isDone = false

    const endState = TasksReducer(startState, changeCheckedAC(isDone, todolistId1, taskID))
    expect(endState[todolistId1][0].isDone).toBe(false)
    expect(endState[todolistId1][1].isDone).toBe(false)
    expect(endState[todolistId2][0].isDone).toBe(true)


})

test('correct task name should be changed', ()=>{
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

    let newTitle = 'New title'
    let taskID = startState[todolistId1][0].id

    const endState = TasksReducer(startState, renameTaskAC(newTitle, todolistId1, taskID))

    expect(endState[todolistId1][0].title).toBe('New title')
    expect(endState[todolistId1][1].title).toBe("JS")
    expect(endState[todolistId2][0].title).toBe("Milk")

})