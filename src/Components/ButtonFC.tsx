import React from 'react';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type PropsType = {
    title?: string
    callBack: () => void
    error?: string | null
    className?: string
    variant?: "outlined" | "contained" | "text" | undefined
    color?: "inherit" | "primary" | "secondary" | "default" | undefined
    iconButton?: boolean
}

export const ButtonFC: React.FC<PropsType> = ({title, callBack, error, className, variant, color, iconButton}) => {

    const onClickHandler = () => {
        callBack()
    }

    return (
                iconButton
                    ?
                    <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={onClickHandler}
                    >
                        <Delete />
                    </IconButton>
                    :
                    <Button
                        variant={variant}
                        color={color}
                        disabled={!!error}
                        onClick={onClickHandler}
                        className={className}
                    >{title}</Button>
    )
}