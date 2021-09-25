import React from 'react';

type PropsType = {
    title?: string
    callBack: () => void
    error?: string | null
    className?: string
}

export const Button: React.FC<PropsType> = ({title, callBack, error, className}) => {

    const onClickHandler = () => {
        callBack()
    }

    return (
        <button
            disabled={!!error}
            onClick={onClickHandler}
            className={className}
        >{title}</button>
    )
}