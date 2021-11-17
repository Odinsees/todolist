import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterTodolistAC, FilterValueType,
    removeTodolistAC,
    renameTodolistAC, TodolistDomainType,
    todolistsReducer,
} from "./todolists-reducer";

let todolistId1 = v1();
let todolistId2 = v1();
let startState: TodolistDomainType[] = [];
beforeEach(() => {
    startState = [{
        filter: "all",
        addedDate: 'string',
        id: todolistId1,
        order: 0,
        title: "What to learn"
    },
        {
            filter: "all",
            addedDate: 'string',
            id: todolistId2,
            order: 0,
            title: "What to buy"
        }]
})

test('correct todolist should be remove', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be add', () => {

    let newTodolistTitle = "New Todolist"

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(startState.length + 1);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all")
})

test('correct todolist should be change name', () => {

    let newTodolistName = "New Todolist"

    const endState = todolistsReducer(startState, renameTodolistAC(todolistId2, newTodolistName))
    expect(endState[1].title).toBe(newTodolistName);
})

test('correct filter of todolist should be changed', () => {

    let newTodolistFilter: FilterValueType = "active"

    const endState = todolistsReducer(startState, changeFilterTodolistAC(todolistId2, newTodolistFilter))
    expect(endState[1].filter).toBe(newTodolistFilter);
    expect(endState[0].filter).toBe("all");
})