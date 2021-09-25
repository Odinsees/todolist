import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "complete"
export type TodoListsType = { id: string, title: string, filter: FilterValueType }
export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksStateType = {
    [key: string]: TaskType[]
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

    const addTask = (todolistID: string, newTaskText: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: newTaskText, isDone: false}, ...tasks[todolistID]]})
    }

    const removeTask = (titleID: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== titleID)})
    }

    return (
        <div className="App">
            {todolists.map(t => {
                return (
                    <Todolist
                        key={t.id}
                        title={t.title}
                        task={tasks[t.id]}
                        todolistID={t.id}
                        removeTask={removeTask}
                        addTask={addTask}
                    />
                )
            })}
        </div>
    );
}

export default App;
