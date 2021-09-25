import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";

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
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    });

    const addTodolist = (newTitle: string) => {
        let newTodolist: TodoListsType = {id: v1(), title: newTitle, filter: "all"}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const addTask = (todolistID: string, newTaskText: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: newTaskText, isDone: false}, ...tasks[todolistID]]})
    }

    const removeTask = (titleID: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== titleID)})
    }

    const changeFilter = (value: FilterValueType, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }

    const changeChecked = (isDone: boolean, todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, isDone: isDone} : m)})
    }

    const renameTask = (newTitle: string, todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, title: newTitle} : m)})
    }

    const renameTodolist = (newTitle: string, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, title: newTitle} : m))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {todolists.map(t => {
                let taskForTodolist = tasks[t.id];
                if (t.filter === "active") {
                    taskForTodolist = tasks[t.id].filter(f => !f.isDone)
                }
                if (t.filter === "complete") {
                    taskForTodolist = tasks[t.id].filter(f => f.isDone)
                }
                return (
                    <Todolist
                        key={t.id}
                        title={t.title}
                        task={taskForTodolist}
                        todolistID={t.id}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeChecked={changeChecked}
                        filter={t.filter}
                        renameTask={renameTask}
                        renameTodolist={renameTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
