import {v1} from "uuid";

export type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof renameTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>

export type FilterValueType = "all" | "active" | "complete"
export type TodoListsType = { id: string, title: string, filter: FilterValueType }


const initialState: TodoListsType[] = []

export const todolistsReducer = (state: TodoListsType[] = initialState, action: ActionsType): TodoListsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(todolist => todolist.id !== action.todolistID)
        }
        case "ADD-TODOLIST": {
            return [{id: action.newTodolistId, title: action.title, filter: "all"}, ...state]
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
    return {type: "REMOVE-TODOLIST", todolistID} as const
}

export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", title: title, newTodolistId: v1()} as const
}

export const renameTodolistAC = (id: string, title: string) => {
    return {type: "RENAME-TODOLIST", id: id, title: title} as const
}
export const changeFilterTodolistAC = (id: string, filter: FilterValueType) => {
    return {type: "CHANGE-FILTER", filter: filter, id: id} as const
}

