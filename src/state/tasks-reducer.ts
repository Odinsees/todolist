import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

type TaskActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckedAC>
    | ReturnType<typeof renameTaskAC>



export const TasksReducer = (state: TasksStateType, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return {...state, [action.newTodolistId]: []}
        }
        case "REMOVE-TODOLIST":{
            let stateCopy = {...state}
            delete stateCopy[action.todolistID]
            return stateCopy
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.newTaskText, isDone: false},
                    ...state[action.todolistID]]
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.titleID)
            }
        }
        case "CHANGE-CHECKED": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }
        }
        case "RENAME-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.newTitle
                } : task)
            }
        }
        default:
            return state
    }
}


export const addTaskAC = (todolistID: string, newTaskText: string) => {
    return {type: "ADD-TASK", todolistID, newTaskText} as const
}
export const removeTaskAC = (todolistID: string, titleID: string) => {
    return {type: "REMOVE-TASK", titleID, todolistID} as const
}
export const changeCheckedAC = (isDone: boolean, todolistID: string, taskID: string) => {
    return {type: "CHANGE-CHECKED", isDone, todolistID, taskID} as const
}
export const renameTaskAC = (newTitle: string, todolistID: string, taskID: string) => {
    return {type: "RENAME-TASK", newTitle, todolistID, taskID} as const
}
export const removeTaskArrayAfterRemoveTodolist = (todolistID:string) => {
    return {type: "REMOVE-TASK-ARRAY-FOR-TODOLIST", todolistID:todolistID} as const
}
