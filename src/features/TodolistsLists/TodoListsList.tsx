import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/Store";
import {addNewTodolist, setTodoLists, TodolistDomainType} from "./todo-lists-reducer";
import React, {useCallback, useEffect} from "react";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodoListsList = () =>{

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addNewTodolist(newTitle))
    }, [dispatch])

    useEffect(()=>{
        dispatch(setTodoLists())
    },[dispatch])

    return (
        <>
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
        </>
    )
}