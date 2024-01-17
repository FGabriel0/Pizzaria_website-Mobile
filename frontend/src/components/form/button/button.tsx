import React from 'react'
import style from "./button.module.scss"
import { FaSpinner } from "react-icons/fa";

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    Loading?: boolean,
    children: ReactNode,

}

export const Button = ({ Loading, children, ...rest }: ButtonProps) => {
    return (
        <button className={style.button} disabled={Loading} {...rest}>
            {Loading ? (<FaSpinner color='#fff' size={16} />) : (
                <a className={style.buttonText} href="">{children}</a>
            )}
        </button>
    )
}
