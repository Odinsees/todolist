import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type PropsType = {
    callBack:(title:string)=>void
    error:string
}

export const AddItemForm:React.FC<PropsType> = ({callBack,error}) =>{

    let [title,setTitle] = useState("")

    const addInputItem = () =>{
        callBack(title)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === "Enter"){
            addInputItem()
        }
    }


    return(
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <Button callBack={addInputItem} error={error}/>
        </div>
    )
}