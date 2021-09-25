import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "complete"
export type TodoListsType = {id: string, title: string, filter: FilterType}
export type TaskType = {id: string, title: string, isDone: boolean}
export type TasksStateType = {
    [key:string]:TaskType[]
}
function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    return (
        <div className="App">
            {todolists.map(t=>{
                return(
                    <Todolist title={t.title} task={tasks[t.id]}/>
                )
            })}
        </div>
    );
}

export default App;
