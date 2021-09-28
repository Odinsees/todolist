import {TodoListsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}


export const todolistsReducer = (state: TodoListsType[], action: ActionType): TodoListsType[] => {
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
        case "CHANGE-FILTER":{
            return state.map(m=>m.id===action.id ? {...m,filter:action.filter}:m)
        }
        default:
            throw new Error('what a fuck?!')
    }
}