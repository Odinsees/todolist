import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
import s from "./EditableSpan.module.css"

type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan: React.FC<PropsType> = ({callBack, ...props}) => {

    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(props.title)


    const editModeHandler = () => {
        setEdit(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        callBack(title)
        setEdit(false)
    }

    return (
        <div className={s.editSpan}>
            {edit
                ? <TextField
                    id="standard-basic"
                    autoFocus value={title}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    variant="standard"
                />
                : <span onDoubleClick={editModeHandler}>{props.title}</span>}
        </div>

    )
}