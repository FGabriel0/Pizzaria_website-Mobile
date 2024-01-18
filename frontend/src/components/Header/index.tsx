import style from "../Header/header.module.scss"
import Link from "next/link"
import { FiLogOut } from "react-icons/fi"
import { AuthContext } from "@/src/contexts/AuthContext"
import { useContext } from "react"

export default function Header(){
    const{signOut} = useContext(AuthContext)
    return(
        <header className={style.container}>
            <div className={style.content}>

            <Link href="/dashboard">
                <img src="/logo.svg" width={190} height={60}/>
            </Link>

            <nav className={style.navbar}>
                <Link href="/category">
                    <p>Categorias</p>
                </Link>

                <Link href="/product">
                    <p>Cardapio</p>
                </Link>

                <button onClick={signOut}>
                    <FiLogOut color="white" size={24}/>
                    
                </button>
            </nav>
            </div>
        </header>
    )
}