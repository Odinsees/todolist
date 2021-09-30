import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    title: string
    task: TaskType[]
    todolistID: string
    removeTask: (todolistID: string, titleID: string) => void
    addTask: (todolistID: string, newTitleText: string) => void
    changeFilter: (value: FilterValueType, todolistID: string) => void
    changeChecked: (isDone: boolean, todolistID: string, taskID: string) => void
    filter: FilterValueType
    renameTask: (newTitle: string, todolistID: string, taskID: string) => void
    renameTodolist: (newTitle: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

export const Todolist: React.FC<PropsType> = ({todolistID, filter, ...props}) => {

    const callBackFromAddTask = (newTitleText: string) => {
        props.addTask(todolistID, newTitleText)
    }

    const changeFilterCallback = (value: FilterValueType) => {
        props.changeFilter(value, todolistID)
    }

    const changeTodolistNameCallBack = (newTitle: string) => {
        props.renameTodolist(newTitle, todolistID)
    }

    const callBackFromRemoveTodolist = () => {
        props.removeTodolist(todolistID)
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
            {props.task.map(m => {
                debugger
                const callBackFromRemoveTask = () => {
                    props.removeTask(m.id, todolistID)
                }

                const changeIsDoneCallBack = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeChecked(e.currentTarget.checked, todolistID, m.id)
                }

                const callBackForRenameTask = (newTitle: string) => {
                    props.renameTask(newTitle, todolistID, m.id)
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
                        onClick={() => changeFilterCallback('all')}>All</Button>
                <Button variant={filter === 'active' ? "contained" : 'outlined'} color="primary"
                        onClick={() => changeFilterCallback('active')}>Active</Button>
                <Button variant={filter === 'complete' ? "contained" : 'outlined'} color="primary"
                        onClick={() => changeFilterCallback('complete')}>Completed</Button>
            </div>
        </div>
    )
}