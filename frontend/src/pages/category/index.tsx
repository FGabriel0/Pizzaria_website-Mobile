import Head from "next/head"
import style from "../category/category.module.scss"
import Header from "../../components/Header/index"
import { useState,FormEvent } from "react"
import { setupAPIClient } from "../../services/ApiService"
import { toast } from "react-toastify"
import { canSSRAuth } from "@/src/utils/canSSRAuth"

export default function Category(){
    
    const [nome,setNome] = useState("")

    async function handlerCategory(e:FormEvent) {
        e.preventDefault()

        if(nome === " "){
            return
        }

        const apiClient = setupAPIClient();

        await apiClient.post("/category", {
            nome:nome
        })

        toast.success("Categoria Cadastrada com sucesso")
    }
    return(
        <>  
        <Head>
            <title>Nova categoria - Sujeito Pizzario</title>
        </Head>
        <div className={style.container}>
            <Header/>
        <main className={style.content}>
            <h1>Cadastrar Categorias</h1>

            <form className={style.form} onSubmit={handlerCategory}>
                <input type="text"
                placeholder="Digite uma Categoria"
                value={nome}
                onChange={(e) => e.target.value}
                className={style.input}
                />

                <button type="submit" className={style.buttonAdd}>
                    Cadastrar
                </button>
            </form>
        </main>
        </div>
        
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    return{
        props:{}
    }
})