import React, {ChangeEvent, useState} from 'react';

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
        edit
            ? <input autoFocus value={title} onChange={onChangeHandler} onBlur={onBlurHandler}/>
            : <span onDoubleClick={editModeHandler}>{props.title}</span>
    )
}