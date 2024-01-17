import style from "./input.module.scss"
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextArea extends InputHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}:InputProps) {
    return (
        <input className={style.input} {...rest}/>
    )
}


export function TextArea({...rest}:TextArea){
    return(
        <textarea className={style.input} {...rest}></textarea>
    )
}