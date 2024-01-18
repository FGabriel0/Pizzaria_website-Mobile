import Head from "next/head"
import Logo from "../../public/logo.svg"
import Image from "next/image"
import style from "../../styles/Home.module.scss"
import { Button } from "../components/form/button/button"
import Link from "next/link"
import {canSSRGuest} from "../utils/canSSRGuest"
import { useState,useContext,FormEvent } from "react"
import { AuthContext } from "@/src/contexts/AuthContext"

import { Input } from "../components/form/input"
import { toast } from "react-toastify"
export default function Home() {

  const [email,setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[loading, setLoading] = useState(false)

  const {signIn} = useContext(AuthContext);

  
  async function handlerLogin(e: FormEvent) {
    e.preventDefault()
    if(email == "" || password == ""){
      toast.error("Preencha todos os dados")
      return alert("Preencher Dados")
    }

    setLoading(true)

    let data= {
      email,
      password
    }
    await signIn(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Sujeito Programador - Faça seu login</title>
      </Head>
      <div className={style.container}>
        <Image src={Logo} alt="Logo Pizzaria sujeito" />

        <div className={style.login}>
          <form onSubmit={handlerLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <Button
              type="submit"
              Loading={loading}
            >
              Acessar
            </Button>
          </form>
          <Link href="/signup">
              <p className={style.text}>Não possui conta?</p>
            </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async(ctx) =>{
  return{
    props:{
      
    }
  } 
})


