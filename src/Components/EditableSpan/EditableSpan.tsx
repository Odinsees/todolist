import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = React.memo(function ({callBack, ...props}: PropsType) {

    console.log("EditableSpan is called")

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
        edit
            ? <TextField
                id="standard-basic"
                autoFocus value={title}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                variant="standard"
            />
            : <span onDoubleClick={editModeHandler}>{props.title}</span>

    )
})