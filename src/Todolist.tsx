import React from 'react';
import {TaskType} from "./App";
import {Button} from "./Components/Button";
import {AddItemForm} from "./Components/AddItemForm";


type PropsType={
    title:string
    task: TaskType[]
    todolistID:string
    removeTask:(todolistID:string,titleID:string)=>void
    addTask:(todolistID:string,newTitleText:string)=>void
}

export const Todolist:React.FC<PropsType> = ({todolistID,...props}) =>{

    const callBackFromAddTask = (newTitleText:string) => {
        props.addTask(todolistID,newTitleText)
    }

    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <AddItemForm callBack={callBackFromAddTask}/>
            </div>
            <ul>
                {props.task.map(m=>{
                    const callBackFromRemoveTask = () => {
                        props.removeTask(m.id,todolistID)
                    }
                    return (
                        <div key={m.id}>
                            <span>{m.title}</span>
                            <input type="checkbox" checked={m.isDone}/>
                            <Button callBack={callBackFromRemoveTask} title={'x'}/>
                        </div>

                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}