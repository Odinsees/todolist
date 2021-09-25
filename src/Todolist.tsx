import React from 'react';
import {TaskType} from "./App";


type PropsType={
    title:string
    task: TaskType[]
}

export const Todolist = (props:PropsType) =>{
    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(m=>{
                    return (
                        <div>
                            <span>{m.title}</span>
                            <input type="checkbox" checked={m.isDone}/>
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