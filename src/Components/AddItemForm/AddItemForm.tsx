import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ButtonFC} from "../ButtonFC/ButtonFC";
import s from "./AddItemForm.module.css"
import {Button, TextField} from "@material-ui/core";

type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm: React.FC<PropsType> = ({callBack}) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addInputItem = () => {
        if (title.trim() !== "") {
            callBack(title)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addInputItem()
            setTitle('')
        }
    }


    return (
            <div className={s.content}>
                <div className={s.textField}>
                    <TextField
                        error={error}
                        id="outlined-basic"
                        label="Title is required"
                        variant="outlined"
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        color={error?'secondary':'primary'}
                        size="small"
                    />
                </div>
                <Button variant="contained"
                        color='primary'
                        style={{maxWidth: '37px', maxHeight: '70px', minWidth: '37px', minHeight: '37px'}}
                        onClick={addInputItem}
                        disabled={error}
                >+
                </Button>
            </div>
    )
}

