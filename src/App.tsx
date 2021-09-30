import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    removeTodolistAC,
    renameTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeCheckedAC, removeTaskAC, renameTaskAC, TasksReducer} from "./state/tasks-reducer";

export type FilterValueType = "all" | "active" | "complete"
export type TodoListsType = { id: string, title: string, filter: FilterValueType }
export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTask] = useReducer(TasksReducer, {
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
        let newTodolistId = v1()
        dispatchTodolist(addTodolistAC(newTitle, newTodolistId))
        dispatchTask(addTodolistAC(newTitle, newTodolistId))
    }
    const removeTodolist = (todolistID: string) => {
        dispatchTodolist(removeTodolistAC(todolistID))
    }
    const renameTodolist = (newTitle: string, todolistID: string) => {
        dispatchTodolist(renameTodolistAC(todolistID, newTitle))
    }
    const changeFilter = (value: FilterValueType, todolistID: string) => {
        dispatchTodolist(changeFilterTodolistAC(todolistID, value))
    }


    const addTask = (todolistID: string, newTaskText: string) => {
        dispatchTask(addTaskAC(todolistID, newTaskText))
    }

    const removeTask = (titleID: string, todolistID: string) => {
        dispatchTask(removeTaskAC(todolistID, titleID))
    }

    const changeChecked = (isDone: boolean, todolistID: string, taskID: string) => {
        //setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, isDone: isDone} : m)})
        dispatchTask(changeCheckedAC(isDone, todolistID, taskID))
    }

    const renameTask = (newTitle: string, todolistID: string, taskID: string) => {
        //setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, title: newTitle} : m)})
        dispatchTask(renameTaskAC(newTitle, todolistID, taskID))
    }


    return (
        <div className="App">
            <Box style={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            style={{margin: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" style={{flexGrow: 1}}>
                            Your Todolist
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(t => {
                        let taskForTodolist = tasks[t.id];
                        if (t.filter === "active") {
                            taskForTodolist = tasks[t.id].filter(f => !f.isDone)
                        }
                        if (t.filter === "complete") {
                            taskForTodolist = tasks[t.id].filter(f => f.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
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
                                </Paper>
                            </Grid>
                        )
                    })}</Grid>
            </Container>
        </div>
    );
}

export default App;
