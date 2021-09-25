import React from 'react';

type PropsType = {
    title?:string
    callBack:()=>void
    error?:string|null
}

export const Button:React.FC<PropsType> = ({title,callBack,error}) =>{

    const onClickHandler = () =>{
        callBack()
    }

    return(
        <button disabled={!!error} onClick={onClickHandler}>{title}</button>
    )
}