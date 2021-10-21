import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = React.memo(function ({callBack}: PropsType) {
    console.log('AddItemForm')
    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

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
        <div>
            <TextField
                error={error}
                id="outlined-basic"
                label="Title is required"
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                color={error ? 'secondary' : 'primary'}
                size="small"
            />
            <Button variant="contained"
                    color='primary'
                    style={{maxWidth: '37px', maxHeight: '70px', minWidth: '37px', minHeight: '39px'}}
                    onClick={addInputItem}
                    disabled={error}
            >+
            </Button>
        </div>
    )
})

