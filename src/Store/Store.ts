import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "../state/todo-lists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import thunk from "redux-thunk";



let rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

// let preloadedState;
// const persistedTodolistString = localStorage.getItem("appState")
// if (persistedTodolistString){
//     preloadedState = JSON.parse(persistedTodolistString)
// }

export const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(()=>{
    localStorage.setItem("appState", JSON.stringify(store.getState()))
})

// @ts-ignore
window.store = store