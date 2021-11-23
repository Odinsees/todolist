import React from 'react';
import './App.css';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodoListsList} from "../features/TodolistsLists/TodoListsList";


function App() {
    console.log("APP is called")

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
            <TodoListsList/>
        </div>
    );
}

export default App;
