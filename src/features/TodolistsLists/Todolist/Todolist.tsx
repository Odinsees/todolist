import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {createTaskForTodolist, setTaskForTodolist} from "../tasks-reducer";
import {changeFilterTodolistAC, FilterValueType, removeTodolist, renameTodolist} from "../todo-lists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../app/Store";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/api";

type PropsType = {
    title: string
    todolistID: string
    filter: FilterValueType
}


export const Todolist = React.memo(function ({filter, todolistID, ...props}: PropsType) {

    console.log("Todolist is called")

    const dispatch = useDispatch()
    const task = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistID])

    const addTask = useCallback((newTitleText: string) => {
        dispatch(createTaskForTodolist(todolistID, newTitleText))
    }, [dispatch, todolistID])

    const changeFilter = useCallback((value: FilterValueType) => {
        dispatch(changeFilterTodolistAC(todolistID, value))
    }, [dispatch, todolistID])

    const renameTodolistHandler = useCallback((newTitle: string) => {
        dispatch(renameTodolist(todolistID, newTitle))
    }, [dispatch, todolistID])

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolist(todolistID))
    }, [dispatch, todolistID])

    let taskForTodolist = task;
    if (filter === "active") {
        taskForTodolist = task.filter(f => f.status === TaskStatuses.New)
    }
    if (filter === "complete") {
        taskForTodolist = task.filter(f => f.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatch(setTaskForTodolist(todolistID))
    }, [dispatch, todolistID])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={renameTodolistHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTask}/>
            {taskForTodolist.map(task =>
                <Task
                    task={task}
                    todolistID={todolistID}
                    key={task.id}
                />
            )}
            <div style={{paddingTop: "5px"}}>
                <Button variant={filter === 'all' ? "contained" : 'outlined'} color="primary"
                        onClick={() => changeFilter('all')}>All</Button>
                <Button variant={filter === 'active' ? "contained" : 'outlined'} color="primary"
                        onClick={() => changeFilter('active')}>Active</Button>
                <Button variant={filter === 'complete' ? "contained" : 'outlined'} color="primary"
                        onClick={() => changeFilter('complete')}>Completed</Button>
            </div>
        </div>
    )
})




