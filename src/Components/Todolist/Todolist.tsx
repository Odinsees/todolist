import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "../../App";
import {ButtonFC} from "../ButtonFC/ButtonFC";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox} from "@material-ui/core";
import s from "./Todolist.module.css"

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
    removeTodolist:(todolistID: string)=>void
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
        <div className={s.content}>
            <div className={s.title}>
                <h3><EditableSpan title={props.title} callBack={changeTodolistNameCallBack}/></h3>
                <ButtonFC callBack={callBackFromRemoveTodolist} iconButton={true}/>
            </div>
            <div>
                <AddItemForm callBack={callBackFromAddTask}/>
            </div>
                {props.task.map(m => {
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
                        <div key={m.id} className={s.task}>
                            <div className={s.editSpan}>
                                <EditableSpan title={m.title} callBack={callBackForRenameTask}/>
                            </div>
                            <div className={s.taskCheckBox}>
                                <Checkbox
                                    checked={m.isDone}
                                    color={"primary"}
                                    onChange={changeIsDoneCallBack}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                            <div className={s.removeTaskBTN}>
                                <ButtonFC callBack={callBackFromRemoveTask} iconButton={true}/>
                            </div>
                        </div>

                    )
                })}
            <div className={s.buttonBox}>
                <ButtonFC
                    callBack={() => changeFilterCallback('all')}
                    title={"All"}
                    variant={filter === 'all'
                        ? 'contained'
                        : 'outlined'}
                    color={"primary"}
                    iconButton={false}
                />
                <ButtonFC
                    callBack={() => changeFilterCallback('active')}
                    title={"Active"}
                    variant={filter === 'active'
                        ? 'contained'
                        : 'outlined'}
                    color={"primary"}
                    iconButton={false}
                />
                <ButtonFC
                    callBack={() => changeFilterCallback('complete')}
                    title={"Completed"}
                    variant={filter === 'complete'
                        ? 'contained'
                        : 'outlined'}
                    color={"primary"}
                    iconButton={false}
                />
            </div>
        </div>
    )
}