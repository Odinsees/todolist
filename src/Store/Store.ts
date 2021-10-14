import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";


let rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

let preloadedState;
const persistedCounterString = localStorage.getItem("appState")
if (persistedCounterString){
    preloadedState = JSON.parse(persistedCounterString)
}

export const store = createStore(rootReducer,preloadedState)

store.subscribe(()=>{
    localStorage.setItem("appState", JSON.stringify(store.getState()))
})

// @ts-ignore
window.store = store