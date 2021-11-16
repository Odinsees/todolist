import axios from "axios";

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskRequestType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


type ResponseType<D> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1734c197-25c0-4bdd-9d52-5f9220f3c903'
    }
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(newTodolistTitle: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: newTodolistTitle})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, newTitle: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: newTitle})
    },
    getTaskForTodolist(todolistId: string) {
        return instance.get<ResponseType<TaskType[]>>(`/todo-lists/${todolistId}/tasks?`)
    },
    createTaskForTodolist(todolistId: string, newTaskTitle: string) {
        return instance.post<ResponseType<TaskType[]>>(`/todo-lists/${todolistId}/tasks`, {title: newTaskTitle})
    },
    updateTaskForTodolist(todolistId: string, taskId: string, model: UpdateTaskRequestType) {
        return instance.put<ResponseType<TaskType[]>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTaskForTodolist(todolistId: string, taskId: string) {
        return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }

}