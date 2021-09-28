import {v1} from "uuid";
import {FilterValueType, TodoListsType} from "../App";
import {todolistsReducer} from "./todolists-reducer";


test('correct todolist should be remove', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let startState: TodoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId1})

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

    const endState = todolistsReducer(startState, {
        type: "ADD-TODOLIST",
        title: newTodolistTitle,
    })

    expect(endState.length).toBe(startState.length + 1);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all")
})

test('correct todolist should be change name', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistName = "New Todolist"

    let startState: TodoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let action = {
        type: "RENAME-TODOLIST",
        title: newTodolistName,
        id: todolistId2
    }

    const endState = todolistsReducer(startState,action)
    expect(endState[1].title).toBe(newTodolistName);
})

test('correct filter of todolist should be changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistFilter:FilterValueType = "active"

    let startState: TodoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let action = {
        type: "CHANGE-FILTER",
        filter: newTodolistFilter,
        id: todolistId2
    }

    const endState = todolistsReducer(startState,action)
    expect(endState[1].filter).toBe(newTodolistFilter);
    expect(endState[0].filter).toBe("all");
})