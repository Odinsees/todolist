import React, {useReducer, useState} from 'react';
import './App.module.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import s from "./App.module.css"
import {
    addTodolistAC,
    changeFilterTodolistAC,
    removeTodolistAC,
    renameTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

export type FilterValueType = "all" | "active" | "complete"
export type TodoListsType = { id: string, title: string, filter: FilterValueType }
export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolist] = useReducer(todolistsReducer,[
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
        dispatchTodolist(addTodolistAC(newTitle))
    }
    const removeTodolist = (todolistID: string) => {
        dispatchTodolist(removeTodolistAC(todolistID))
    }
    const renameTodolist = (newTitle: string, todolistID: string) => {
        dispatchTodolist(renameTodolistAC(todolistID,todolistID))
    }
    const changeFilter = (value: FilterValueType, todolistID: string) => {
        dispatchTodolist(changeFilterTodolistAC(todolistID,value))
    }



    const addTask = (todolistID: string, newTaskText: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: newTaskText, isDone: false}, ...tasks[todolistID]]})
    }

    const removeTask = (titleID: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== titleID)})
    }

    const changeChecked = (isDone: boolean, todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, isDone: isDone} : m)})
    }

    const renameTask = (newTitle: string, todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, title: newTitle} : m)})
    }




    return (
        <div className = {s.App}>
            <div className={s.addForm}>
                <h3>Add Todolist</h3>
                <AddItemForm callBack={addTodolist}/>
            </div>
            <div className={s.todolistComponent}>
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
                            removeTodolist={removeTodolist}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
