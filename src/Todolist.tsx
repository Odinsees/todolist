import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";
import {Button} from "./Components/Button";
import {AddItemForm} from "./Components/AddItemForm";
import s from "./Todolist.module.css"
import {EditableSpan} from "./Components/EditableSpan";

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


    return (
        <div>
            <h3><EditableSpan title={props.title} callBack={changeTodolistNameCallBack}/></h3>
            <div>
                <AddItemForm callBack={callBackFromAddTask}/>
            </div>
            <ul>
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
                        <div key={m.id}>
                            <EditableSpan title={m.title} callBack={callBackForRenameTask}/>
                            <input
                                type="checkbox"
                                checked={m.isDone}
                                onChange={changeIsDoneCallBack}
                            />
                            <Button callBack={callBackFromRemoveTask} title={'x'}/>
                        </div>

                    )
                })}
            </ul>
            <div>
                <Button
                    callBack={() => changeFilterCallback('all')}
                    title={"All"}
                    className={filter === 'all' ? s.Active : s.StandardButton}
                />
                <Button
                    callBack={() => changeFilterCallback('active')}
                    title={"Active"}
                    className={filter === 'active' ? s.Active : s.StandardButton}
                />
                <Button
                    callBack={() => changeFilterCallback('complete')}
                    title={"Completed"}
                    className={filter === 'complete' ? s.Active : s.StandardButton}
                />
            </div>
        </div>
    )
}