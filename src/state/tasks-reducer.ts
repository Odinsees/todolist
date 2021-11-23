import {
    ADD_TODOLIST,
    addTodolistAC,
    REMOVE_TODOLIST,
    removeTodolistAC,
    SET_TODOLIST,
    setTodoListsAC
} from "./todo-lists-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateTaskModelType
} from "../api/api";
import {Dispatch} from "redux";


// constants

const ADD_TASK = 'task-reducer/ADD-TASK'
const REMOVE_TASK = 'task-reducer/REMOVE-TASK'
const SET_TASK = 'task-reducer/SET-TASK'
const UPDATE_TASK = 'task-reducer/UPDATE_TASK'


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            return {...state,
                [action.task.todoListId] : [action.task, ...state[action.task.todoListId]]
            };
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        case SET_TODOLIST: {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case ADD_TODOLIST: {
            return {...state, [action.newTodolist.id]: []}
        }
        case REMOVE_TODOLIST:
            let stateCopy = {...state}
            delete stateCopy[action.todolistID]
            return stateCopy
        case SET_TASK:
            return {...state,
                [action.todolistID]:[...action.task]
            }
        case UPDATE_TASK: {
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId]
                    .map(task => task.id === action.task.id ? {...task, ...action.task} : task)
            }
        }
        default:
            return state
    }
}

//actions

export const addTaskAC = (task: TaskType) => ({type: ADD_TASK, task} as const)
export const removeTaskAC = (todolistID: string, taskID: string) =>
    ({type: REMOVE_TASK, taskID, todolistID} as const)
export const setTaskAC = (task: TaskType[], todolistID: string) =>
    ({type: SET_TASK, task, todolistID} as const)
export const updateTaskAC = (task: TaskType) => ({type: UPDATE_TASK, task} as const)


//thunk

export const setTaskForTodolist = (todolistID: string) => (dispatch: Dispatch<TaskActionsType>) => {
    todolistAPI.getTaskForTodolist(todolistID)
        .then(res => {
            dispatch(setTaskAC(res.data.items, todolistID))
        })
}

export const createTaskForTodolist = (todolistID: string, newTaskTitle: string) => (dispatch: Dispatch<TaskActionsType>) => {
    todolistAPI.createTaskForTodolist(todolistID, newTaskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
            }
        })
}

export const removeTaskForTodolist = (todolistID: string, taskID: string) => (dispatch: Dispatch<TaskActionsType>) => {
    todolistAPI.deleteTaskForTodolist(todolistID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistID, taskID))
            }
        })
}

export const updateTask = (task: TaskType, modelDomain: UpdateDomainTaskModelType) => (dispatch: Dispatch<TaskActionsType>) => {
    let modelAPI: UpdateTaskModelType = {
        ...task,
        ...modelDomain
    } as UpdateTaskModelType
    todolistAPI.updateTaskForTodolist(task.todoListId, task.id, modelAPI)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(res.data.data.item))
            }
        })
}

//types

type TaskActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof updateTaskAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

