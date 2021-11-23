import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {removeTaskForTodolist, updateTask} from "../../../../state/tasks-reducer";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/api";

type TaskPropsType = {
    todolistID: string
    task: TaskType
}

export const Task = React.memo(function ({task, todolistID}: TaskPropsType) {

    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskForTodolist(todolistID, task.id))
    }, [dispatch, todolistID, task.id])

    const changeStatus = useCallback(() => {
        let  status = task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTask(task, {status}))
    }, [dispatch, task])

    const renameTask = useCallback((title: string) => {
        dispatch(updateTask(task, {title}))
    }, [dispatch, task])


    return (
        <div key={task.id}>
            <EditableSpan title={task.title} callBack={renameTask}/>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color={"primary"}
                onChange={changeStatus}
                inputProps={{'aria-label': 'controlled'}}
                size='small'
            />
            <IconButton aria-label="delete" onClick={removeTask}>
                <Delete fontSize="inherit"/>
            </IconButton>
        </div>
    )
})