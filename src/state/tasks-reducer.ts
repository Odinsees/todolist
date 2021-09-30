import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC} from "./todolists-reducer";

type TaskActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType <typeof addTodolistAC>
    | ReturnType<typeof removeTaskAC>


export const TasksReducer = (state: TasksStateType, action: TaskActionsType):TasksStateType => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return {...state, [action.newTodolistID]: []}
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
                [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.titleID)
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