import React, {ChangeEvent} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC, changeCheckedAC, removeTaskAC, renameTaskAC, TaskType} from "../../state/tasks-reducer";
import {changeFilterTodolistAC, FilterValueType} from "../../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../Store/Store";

type PropsType = {
    title: string
    todolistID: string
    filter: FilterValueType
    renameTodolist: (newTitle: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

export const Todolist: React.FC<PropsType> = ({todolistID, filter, ...props}) => {


    const dispatch = useDispatch()
    const task = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistID])


    const callBackFromAddTask = (newTitleText: string) => {
        dispatch(addTaskAC(todolistID, newTitleText))
    }
    const changeFilter = (value: FilterValueType) => {
        dispatch(changeFilterTodolistAC(todolistID, value))
    }
    const changeTodolistNameCallBack = (newTitle: string) => {
        props.renameTodolist(newTitle, todolistID)
    }
    const callBackFromRemoveTodolist = () => {
        props.removeTodolist(todolistID)
    }

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
                <EditableSpan title={props.title} callBack={changeTodolistNameCallBack}/>
                <IconButton aria-label="delete">
                    <Delete fontSize="inherit" onClick={callBackFromRemoveTodolist}/>
                </IconButton>
            </h3>
            <AddItemForm callBack={callBackFromAddTask}/>
            {taskForTodolist.map(m => {
                const callBackFromRemoveTask = () => {
                    dispatch(removeTaskAC(todolistID, m.id))
                }
                const changeIsDoneCallBack = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeCheckedAC(e.currentTarget.checked, todolistID, m.id))
                }
                const callBackForRenameTask = (newTitle: string) => {
                    dispatch(renameTaskAC(newTitle, todolistID, m.id))
                }

                return (
                    <div key={m.id}>
                        <EditableSpan title={m.title} callBack={callBackForRenameTask}/>
                        <Checkbox
                            checked={m.isDone}
                            color={"primary"}
                            onChange={changeIsDoneCallBack}
                            inputProps={{'aria-label': 'controlled'}}
                            size='small'
                        />
                        <IconButton aria-label="delete">
                            <Delete fontSize="inherit" onClick={callBackFromRemoveTask}/>
                        </IconButton>
                    </div>
                )
            })}
            <div style={{paddingTop : "5px"}}>
                <Button variant={filter === 'all' ? "contained" : 'outlined'} color="primary"
                        onClick={() => changeFilter('all')}>All</Button>
                <Button variant={filter === 'active' ? "contained" : 'outlined'} color="primary"
                        onClick={() => changeFilter('active')}>Active</Button>
                <Button variant={filter === 'complete' ? "contained" : 'outlined'} color="primary"
                        onClick={() => changeFilter('complete')}>Completed</Button>
            </div>
        </div>
    )
}