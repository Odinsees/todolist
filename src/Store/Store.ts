import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";


let rootReducer = combineReducers({
    todolistsReducer,
    tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store