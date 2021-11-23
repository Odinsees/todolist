import {todolistAPI, TodoListsType} from "../api/api";
import {Dispatch} from "redux";


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
            return [{...action.newTodolist, filter: "all"}, ...state]
        }
        case RENAME_TODOLIST: {
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        }
        case CHANGE_FILTER: {
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
        }
        case SET_TODOLIST : {
            return action.todoLists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string) =>
    ({type: REMOVE_TODOLIST, todolistID} as const)
export const addTodolistAC = (newTodolist: TodoListsType) =>
    ({type: ADD_TODOLIST, newTodolist} as const)
export const renameTodolistAC = (id: string, title: string) =>
    ({type: RENAME_TODOLIST, id, title} as const)
export const changeFilterTodolistAC = (id: string, filter: FilterValueType) =>
    ({type: CHANGE_FILTER, filter, id} as const)
export const setTodoListsAC = (todoLists: TodoListsType[]) =>
    ({type: SET_TODOLIST, todoLists: todoLists} as const)


export const setTodoLists = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}

export const addNewTodolist = (newTodolistTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(newTodolistTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
            }
        })
}

export const removeTodolist = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistID))
            }
        })
}

export const renameTodolist = (todolistID: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolistTitle(todolistID, newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(renameTodolistAC(todolistID, newTitle))
            }
        })
}

