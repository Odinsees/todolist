import {v1} from "uuid";
import {addTaskAC, changeCheckedAC, removeTaskAC, renameTaskAC, tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/api";


let todolistId1 = v1();
let todolistId2 = v1();


let startState: TasksStateType = {};
beforeEach(()=>{
    startState = {
        [todolistId1]: [
            {
                description: '',
                title: "HTML&CSS",
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todolistId1,
                order: 0,
                addedDate: '',},
            {
                description: '',
                title: "JS",
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todolistId1,
                order: 0,
                addedDate: '',}
        ],
        [todolistId2]: [
            {
                description: '',
                title: "Milk",
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todolistId2,
                order: 0,
                addedDate: '',},
            {
                description: '',
                title: "React Book",
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todolistId2,
                order: 0,
                addedDate: '',}
        ]
    }
})


test('correct new task array should be added when new todolist added', () => {


    const endState = tasksReducer(startState, addTodolistAC("New Todolist"))

    let key = Object.keys(endState)
    let newKey = key.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('new key should be added!')
    }
    expect(Object.keys(endState).length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('correct task  should be added', () => {

    let newTaskText = "Hello men"

    const endState = tasksReducer(startState, addTaskAC(todolistId1, newTaskText))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe(newTaskText)

})

test('correct task  should be remove', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1].every(f => f.id !== startState[todolistId1][0].id)).toBeTruthy()

})

test ('correct task status should be changed',()=>{


    let taskID = startState[todolistId1][0].id
    let status = TaskStatuses.New

    const endState = tasksReducer(startState, changeCheckedAC(status, todolistId1, taskID))
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New)
    expect(endState[todolistId1][1].status).toBe(TaskStatuses.New)


})

test('correct task name should be changed', ()=>{

    let newTitle = 'New title'
    let taskID = startState[todolistId1][0].id

    const endState = tasksReducer(startState, renameTaskAC(newTitle, todolistId1, taskID))

    expect(endState[todolistId1][0].title).toBe('New title')
    expect(endState[todolistId1][1].title).toBe("JS")
    expect(endState[todolistId2][0].title).toBe("Milk")

})