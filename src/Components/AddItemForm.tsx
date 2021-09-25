import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import s from "./AddItemForm.module.css"

type PropsType = {
    callBack:(title:string)=>void
}

export const AddItemForm:React.FC<PropsType> = ({callBack}) =>{

    let [title,setTitle] = useState("")
    let [error,setError] = useState<string|null>(null)

    const addInputItem = () =>{
        if(title.trim() !== ""){
            callBack(title)
            setTitle('')
        }else{
            setError("Title is required")
        }
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === "Enter"){
            addInputItem()
            setTitle('')
        }
    }


    return(
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error? s.errorInput:''}
            />
            <Button callBack={addInputItem} error={error} title={'+'}/>
            {error?<div className={s.error}>{error}</div>:""}
        </div>
    )
}