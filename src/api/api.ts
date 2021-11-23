import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1734c197-25c0-4bdd-9d52-5f9220f3c903'
    }
})

//API

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodoListsType[]>('todo-lists')
    },
    createTodolist(newTodolistTitle: string) {
        return instance.post<ResponseType<{ item: TodoListsType }>>(`todo-lists`, {title: newTodolistTitle})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, newTitle: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: newTitle})
    },
    getTaskForTodolist(todolistId: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTaskForTodolist(todolistId: string, newTaskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: newTaskTitle})
    },
    updateTaskForTodolist(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTaskForTodolist(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

//types

export type TodoListsType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,

}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type ResponseType<D> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: D
}
type GetTaskResponseType = {
    items:TaskType[]
    totalCount:number
    error:string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
