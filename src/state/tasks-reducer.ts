import {
    ADD_TODOLIST,
    addTodolistAC,
    REMOVE_TODOLIST,
    removeTodolistAC,
    SET_TODOLIST,
    setTodoListsAC
} from "./todo-lists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/api";
import {v1} from "uuid";


const ADD_TASK = 'task-reducer/ADD-TASK'
const REMOVE_TASK = 'task-reducer/REMOVE-TASK'
const CHANGE_CHECKED = 'task-reducer/CHANGE-CHECKED'
const RENAME_TASK = 'task-reducer/RENAME-TASK'

type TaskActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckedAC>
    | ReturnType<typeof renameTaskAC>
    | ReturnType<typeof setTodoListsAC>


export type TasksStateType = {
    [key: string]: TaskType[]
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case ADD_TODOLIST: {
            return {...state, [action.newTodolistId]: []}
        }
        case REMOVE_TODOLIST: {
            let stateCopy = {...state}
            delete stateCopy[action.todolistID]
            return stateCopy
        }
        case ADD_TASK: {
            return {
                ...state,
                [action.todolistID]: [{...action.payload},
                    ...state[action.todolistID]]
            }
        }
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        }
        case CHANGE_CHECKED: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    status: action.status
                } : task)
            }
        }
        case RENAME_TASK: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.newTitle
                } : task)
            }
        }
        case SET_TODOLIST: {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        default:
            return state
    }
}


export const addTaskAC = (todolistID: string, newTaskText: string) => {
    return {
        type: ADD_TASK,
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
    return {type: REMOVE_TASK, taskID, todolistID} as const
}
export const changeCheckedAC = (status: TaskStatuses, todolistID: string, taskID: string) => {
    return {type: CHANGE_CHECKED, status, todolistID, taskID} as const
}
export const renameTaskAC = (newTitle: string, todolistID: string, taskID: string) => {
    return {type: RENAME_TASK, newTitle, todolistID, taskID} as const
}
