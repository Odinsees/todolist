import {FilterValueType, TodoListsType} from "../App";
import {v1} from "uuid";

export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | RenameTodolistActionType
    | ChangeFilterTodolistActionType


type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}
type RenameTodolistActionType = {
    type: "RENAME-TODOLIST"
    id: string
    title: string
}
type ChangeFilterTodolistActionType = {
    type: "CHANGE-FILTER"
    id: string
    filter: FilterValueType
}


export const todolistsReducer = (state: TodoListsType[], action: ActionsType): TodoListsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        }
        case "RENAME-TODOLIST": {
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        }
        case "CHANGE-FILTER": {
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        }
        default:
            throw new Error('what a fuck?!')
    }
}

export const RemoveTodolistAC = (todolistID:string):RemoveTodolistActionType =>{
    return {type:"REMOVE-TODOLIST", id:todolistID}
}

export const AddTodolistAC = (title:string):AddTodolistActionType =>{
    return {type:"ADD-TODOLIST", title:title}
}

export const RenameTodolistAC = (id:string, title:string):RenameTodolistActionType =>{
    return {type:"RENAME-TODOLIST", id:id, title:title}
}
export const ChangeFilterTodolistAC = (id:string, filter:FilterValueType):ChangeFilterTodolistActionType =>{
    return {type:"CHANGE-FILTER", filter:filter, id:id}
}

