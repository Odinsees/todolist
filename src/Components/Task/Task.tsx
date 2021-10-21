import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeCheckedAC, removeTaskAC, renameTaskAC, TaskType} from "../../state/tasks-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    todolistID: string
    task: TaskType
}

export const Task = React.memo(function ({task, todolistID}: TaskPropsType) {

    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolistID, task.id))
    }, [dispatch, todolistID, task.id])

    const changeIsDone = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCheckedAC(e.currentTarget.checked, todolistID, task.id))
    }, [dispatch, todolistID, task.id])

    const renameTask = useCallback((newTitle: string) => {
        dispatch(renameTaskAC(newTitle, todolistID, task.id))
    }, [dispatch, todolistID, task.id])

    return (
        <div key={task.id}>
            <EditableSpan title={task.title} callBack={renameTask}/>
            <Checkbox
                checked={task.isDone}
                color={"primary"}
                onChange={changeIsDone}
                inputProps={{'aria-label': 'controlled'}}
                size='small'
            />
            <IconButton aria-label="delete" onClick={removeTask}>
                <Delete fontSize="inherit"/>
            </IconButton>
        </div>
    )
})