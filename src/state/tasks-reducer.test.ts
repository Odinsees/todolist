import {v1} from "uuid";
import {
    addTaskAC,
    removeTaskAC,
    setTaskAC,
    tasksReducer,
    TasksStateType, updateTaskAC
} from "./tasks-reducer";
import {addTodolistAC, setTodoListsAC, TodolistDomainType} from "./todo-lists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/api";


let todolistId1 = v1();
let todolistId2 = v1();


let startState: TasksStateType = {};
beforeEach(() => {
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
                addedDate: '',
            },
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
                addedDate: '',
            }
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
                addedDate: '',
            },
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
                addedDate: '',
            }
        ]
    }
})


test('correct new task array should be added when new todolist added', () => {

    let newTodolist = {
        id: "a2dfe62b-ebce-4b37-9581-1cc77ebc999f",
        title: "important",
        addedDate: "2019-07-30T12:23:49.677",
        order: 0
    }

    const endState = tasksReducer(startState, addTodolistAC(newTodolist))

    let key = Object.keys(endState)
    let newKey = key.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('new key should be added!')
    }
    expect(Object.keys(endState).length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('correct task  should be added', () => {

    let newTask:TaskType = {
        description: '',
        title: 'newTitle',
        completed: false,
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todolistId1,
        order: 0,
        addedDate: '',
    }

    const endState = tasksReducer(startState, addTaskAC(newTask))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe('newTitle')

})

test('correct task  should be remove', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1].every(f => f.id !== startState[todolistId1][0].id)).toBeTruthy()

})

test('correct task status should be changed', () => {


    let newTask:TaskType = {
        description: '',
        title: 'newTitle',
        completed: false,
        status: 2,
        priority: 0,
        startDate: '',
        deadline: '',
        id: startState[todolistId1][0].id,
        todoListId: todolistId1,
        order: 0,
        addedDate: '',
    }

    const endState = tasksReducer(startState, updateTaskAC(newTask))
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.Completed)
    expect(endState[todolistId1][1].status).toBe(TaskStatuses.New)


})

test('correct task name should be changed', () => {

    let newTask:TaskType = {
        description: '',
        title: 'newTitle',
        completed: false,
        status: 2,
        priority: 0,
        startDate: '',
        deadline: '',
        id: startState[todolistId1][0].id,
        todoListId: todolistId1,
        order: 0,
        addedDate: '',
    }

    const endState = tasksReducer(startState, updateTaskAC(newTask))

    expect(endState[todolistId1][0].title).toBe(newTask.title)
    expect(endState[todolistId1][1].title).toBe("JS")
    expect(endState[todolistId2][0].title).toBe("Milk")

})

test('correct new task array should be added when new todolist set', () => {

    let startState: TodolistDomainType[] =
        [{
            filter: "all",
            addedDate: 'string',
            id: '1',
            order: 0,
            title: "What to learn"
        },
            {
                filter: "all",
                addedDate: 'string',
                id: '2',
                order: 0,
                title: "What to buy"
            }]

    const endState = tasksReducer({}, setTodoListsAC(startState))

    let key = Object.keys(endState)

    expect(key.length).toBe(2)
    expect(endState['1']).toEqual([])
    expect(endState['2']).toEqual([])

})

test('correct task for todolist should be set', () => {

    const endState = tasksReducer({
        [todolistId1]:[],
        [todolistId2]:[]
    }, setTaskAC(startState[todolistId1], todolistId1))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(0)

})