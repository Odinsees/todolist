import React from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {
    addTodolistAC,
    changeFilterTodolistAC, FilterValueType,
    removeTodolistAC,
    renameTodolistAC,
    TodoListsType,
} from "./state/todolists-reducer";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeCheckedAC, removeTaskAC, renameTaskAC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Store/Store";


function App() {
    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, TodoListsType[]>(state => state.todolists)

    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const renameTodolist = (newTitle: string, todolistID: string) => {
        dispatch(renameTodolistAC(todolistID, newTitle))
    }
    const changeFilter = (value: FilterValueType, todolistID: string) => {
        dispatch(changeFilterTodolistAC(todolistID, value))
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
                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={t.id}
                                        title={t.title}
                                        todolistID={t.id}
                                        changeFilter={changeFilter}
                                        filter={t.filter}
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
