import {
    ADD_TODOLIST,
    addTodolistAC,
    REMOVE_TODOLIST,
    removeTodolistAC,
    SET_TODOLIST,
    setTodoListsAC
} from "./todo-lists-reducer";
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/api";
import {Dispatch} from "redux";


const ADD_TASK = 'task-reducer/ADD-TASK'
const REMOVE_TASK = 'task-reducer/REMOVE-TASK'
const CHANGE_CHECKED = 'task-reducer/CHANGE-CHECKED'
const RENAME_TASK = 'task-reducer/RENAME-TASK'
const SET_TASK = 'task-reducer/SET-TASK'

type TaskActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckedAC>
    | ReturnType<typeof renameTaskAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTaskAC>


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
            const stateCopy = {...state}
            stateCopy[action.task.todoListId] = [action.task, ...stateCopy[action.task.todoListId]];
            return stateCopy;
        }
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        }
        case CHANGE_CHECKED: {
            state[action.todolistID] = state[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.status} : t);
            return {...state};
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
        case SET_TASK:{
            const stateCopy = {...state}
            stateCopy[action.todolistID] = [...action.task]
            return stateCopy
        }
        default:
            return state
    }
}


export const addTaskAC = (task: TaskType) => {
    return {type: ADD_TASK, task} as const
}
export const removeTaskAC = (todolistID: string, taskID: string) =>
    ({type: REMOVE_TASK, taskID, todolistID} as const)
export const changeCheckedAC = (status: TaskStatuses, todolistID: string, taskID: string) =>
    ({type: CHANGE_CHECKED, status, todolistID, taskID} as const)
export const renameTaskAC = (newTitle: string, todolistID: string, taskID: string) =>
    ({type: RENAME_TASK, newTitle, todolistID, taskID} as const)
export const setTaskAC = (task: TaskType[], todolistID: string) =>
    ({type: SET_TASK, task, todolistID} as const)


export const setTaskForTodolist = (todolistID:string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTaskForTodolist(todolistID)
            .then(res => {
                dispatch(setTaskAC(res.data.items, todolistID))
            })
    }
}

export const createTaskForTodolist = (todolistID: string, newTaskTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTaskForTodolist(todolistID, newTaskTitle)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                }
            })
    }
}

export const removeTaskForTodolist = (todolistID: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTaskForTodolist(todolistID, taskID)
            .then(res=>{
                if(res.data.resultCode === 0){
                    dispatch(removeTaskAC(todolistID,taskID))
                }
            })
    }
}

export const updateTaskStatus = (task:TaskType) => {
    return (dispatch:Dispatch)=>{
        let model:UpdateTaskModelType = {
            ...task,
            status: task.status === TaskStatuses.New  ? TaskStatuses.Completed : TaskStatuses.New
        } as UpdateTaskModelType
        todolistAPI.updateTaskForTodolist(task.todoListId, task.id, model)
            .then(res=>{
                if (res.data.resultCode === 0){
                    let taskID = res.data.data.item.id
                    let todolistID = res.data.data.item.todoListId
                    let taskStatus = res.data.data.item.status
                    dispatch(changeCheckedAC(taskStatus,todolistID,taskID))
                }
            })
    }
}
