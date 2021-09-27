import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ButtonFC} from "./ButtonFC";
import s from "./AddItemForm.module.css"
import {TextField} from "@material-ui/core";

type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm: React.FC<PropsType> = ({callBack}) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addInputItem = () => {
        if (title.trim() !== "") {
            callBack(title)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addInputItem()
            setTitle('')
        }
    }


    return (
        <div className={s.content}>
            {error
                ?
                <div className={s.textField}>
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label={error}
                        helperText="Incorrect entry."
                        value={title}
                        onChange={onChangeHandler}
                        /*onBlur={onBlurHandler}*/
                    />
                </div>
                :
                <div className={s.textField}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? s.errorInput : ''}
                    />
                </div>
            }
            <ButtonFC
                callBack={addInputItem}
                title={'+'}
                error={error}
                variant={'contained'}
                color={"primary"}
                iconButton={false}
            />
            {/*{error ? <div className={s.error}>{error}</div> : ""}*/}
        </div>
    )
}