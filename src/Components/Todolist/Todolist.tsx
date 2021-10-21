import React, {useCallback} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC, TaskType} from "../../state/tasks-reducer";
import {
    changeFilterTodolistAC,
    FilterValueType,
    removeTodolistAC,
    renameTodolistAC
} from "../../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../Store/Store";
import {Task} from "../Task/Task";

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
        dispatch(addTaskAC(todolistID, newTitleText))
    }, [dispatch, todolistID])

    const changeFilter = useCallback((value: FilterValueType) => {
        dispatch(changeFilterTodolistAC(todolistID, value))
    }, [dispatch, todolistID])

    const renameTodolist = useCallback((newTitle: string) => {
        dispatch(renameTodolistAC(todolistID, newTitle))
    }, [dispatch, todolistID])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch, todolistID])

    let taskForTodolist = task;
    if (filter === "active") {
        taskForTodolist = task.filter(f => !f.isDone)
    }
    if (filter === "complete") {
        taskForTodolist = task.filter(f => f.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={renameTodolist}/>
                <IconButton aria-label="delete" onClick={removeTodolist} >
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




