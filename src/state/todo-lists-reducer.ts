import {v1} from "uuid";
import {TodoListsType} from "../api/api";


export const REMOVE_TODOLIST = 'todoLists-reducer/REMOVE-TODOLIST'
export const ADD_TODOLIST = 'todoLists-reducer/ADD-TODOLIST'
const RENAME_TODOLIST = 'todoLists-reducer/RENAME-TODOLIST'
const CHANGE_FILTER = 'todoLists-reducer/CHANGE-FILTER'
export const SET_TODOLIST = 'todoLists-reducer/SET-TODOLIST'


export type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof renameTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof setTodoListsAC>

export type FilterValueType = "all" | "active" | "complete"

export type TodolistDomainType = TodoListsType & {
    filter: FilterValueType
}


const initialState: TodolistDomainType[] = []

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(todolist => todolist.id !== action.todolistID)
        }
        case ADD_TODOLIST: {
            return [{id: action.newTodolistId, title: action.title, filter: "all", addedDate:'', order:0}, ...state]
        }
        case RENAME_TODOLIST: {
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        }
        case CHANGE_FILTER: {
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
        }
        case SET_TODOLIST :{
            return action.todoLists.map(tl=>{
                return {
                    ...tl,
                    filter:"all"
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {type: REMOVE_TODOLIST, todolistID} as const
}

export const addTodolistAC = (title: string) => {
    return {type: ADD_TODOLIST, title: title, newTodolistId: v1()} as const
}

export const renameTodolistAC = (id: string, title: string) => {
    return {type: RENAME_TODOLIST, id: id, title: title} as const
}
export const changeFilterTodolistAC = (id: string, filter: FilterValueType) => {
    return {type: CHANGE_FILTER, filter: filter, id: id} as const
}

export const setTodoListsAC = (todoLists: TodoListsType[]) => {
    return {type: SET_TODOLIST, todoLists: todoLists} as const
}

