import {v1} from "uuid";
import {FilterValueType, TodoListsType} from "../App";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    removeTodolistAC,
    renameTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


test('correct todolist should be remove', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let startState: TodoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be add', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = "New Todolist"

    let startState: TodoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(startState.length + 1);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all")
})

test('correct todolist should be change name', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistName = "New Todolist"

    let startState: TodoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, renameTodolistAC(todolistId2, newTodolistName))
    expect(endState[1].title).toBe(newTodolistName);
})

test('correct filter of todolist should be changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistFilter: FilterValueType = "active"

    let startState: TodoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, changeFilterTodolistAC(todolistId2, newTodolistFilter))
    expect(endState[1].filter).toBe(newTodolistFilter);
    expect(endState[0].filter).toBe("all");
})