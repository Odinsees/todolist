import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../features/Todolist/Todolist";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {addNewTodolist, setTodoLists, TodolistDomainType} from "../state/todo-lists-reducer";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../Store/Store";


function App() {
    console.log("APP is called")
    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addNewTodolist(newTitle))
    }, [dispatch])

    useEffect(()=>{
        dispatch(setTodoLists())
    },[dispatch])


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
                    {todoLists.map(t => {
                        return (
                            <Grid item key={t.id}>
                                <Paper style={{padding: "10px"}} key={t.id}>
                                    <Todolist
                                        key={t.id}
                                        title={t.title}
                                        todolistID={t.id}
                                        filter={t.filter}
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