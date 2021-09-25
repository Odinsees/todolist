import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";
import {Button} from "./Components/Button";
import {AddItemForm} from "./Components/AddItemForm";


type PropsType = {
    title: string
    task: TaskType[]
    todolistID: string
    removeTask: (todolistID: string, titleID: string) => void
    addTask: (todolistID: string, newTitleText: string) => void
    changeFilter: (value: FilterValueType, todolistID:string) => void
    changeChecked:(isDone:boolean,todolistID:string, taskID:string )=>void
}

export const Todolist: React.FC<PropsType> = ({todolistID, ...props}) => {

    const callBackFromAddTask = (newTitleText: string) => {
        props.addTask(todolistID, newTitleText)
    }

    const changeFilterCallback = (value: FilterValueType) => {
        props.changeFilter(value, todolistID)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <AddItemForm callBack={callBackFromAddTask}/>
            </div>
            <ul>
                {props.task.map(m => {
                    const callBackFromRemoveTask = () => {
                        props.removeTask(m.id, todolistID)
                    }

                    const changeIsDoneCallBack = (e:ChangeEvent<HTMLInputElement>) => {
                        props.changeChecked(e.currentTarget.checked, todolistID, m.id)
                    }

                    return (
                        <div key={m.id}>
                            <span>{m.title}</span>
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
                <Button callBack={() => changeFilterCallback('all')} title={"All"}/>
                <Button callBack={() => changeFilterCallback('active')} title={"Active"}/>
                <Button callBack={() => changeFilterCallback('complete')} title={"Complete"}/>
            </div>
        </div>
    )
}