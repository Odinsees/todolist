import {FilterValueType, TodoListsType} from "../App";

export type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof renameTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>


export const todolistsReducer = (state: TodoListsType[], action: ActionsType): TodoListsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.newTodolistId, title: action.title, filter: "all"}]
        }
        case "RENAME-TODOLIST": {
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        }
        case "CHANGE-FILTER": {
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistID} as const
}

export const addTodolistAC = (title: string, newTodolistId:string) => {
    return {type: "ADD-TODOLIST", title: title, newTodolistId} as const
}

export const renameTodolistAC = (id: string, title: string) => {
    return {type: "RENAME-TODOLIST", id: id, title: title} as const
}
export const changeFilterTodolistAC = (id: string, filter: FilterValueType) => {
    return {type: "CHANGE-FILTER", filter: filter, id: id} as const
}

