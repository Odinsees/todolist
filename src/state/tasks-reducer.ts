import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/api";
import {v1} from "uuid";

type TaskActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckedAC>
    | ReturnType<typeof renameTaskAC>

export type TasksStateType = {
    [key: string]: TaskType[]
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return {...state, [action.newTodolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.todolistID]
            return stateCopy
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistID]: [{...action.payload},
                    ...state[action.todolistID]]
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        }
        case "CHANGE-CHECKED": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    status: !action.isDone ? TaskStatuses.New : TaskStatuses.Completed
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
    return {
        type: "ADD-TASK",
        todolistID,
        payload: {
            description: '',
            title: newTaskText,
            completed: false,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            id: v1(),
            todoListId: todolistID,
            order: 0,
            addedDate: '',
        }
    } as const
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {type: "REMOVE-TASK", taskID, todolistID} as const
}
export const changeCheckedAC = (isDone: boolean, todolistID: string, taskID: string) => {
    return {type: "CHANGE-CHECKED", isDone, todolistID, taskID} as const
}
export const renameTaskAC = (newTitle: string, todolistID: string, taskID: string) => {
    return {type: "RENAME-TASK", newTitle, todolistID, taskID} as const
}
export const removeTaskArrayAfterRemoveTodolist = (todolistID: string) => {
    return {type: "REMOVE-TASK-ARRAY-FOR-TODOLIST", todolistID: todolistID} as const
}
