import { FormEvent, useContext, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Logo from "../../../public/logo.svg"
import Image from "next/image"
import style from "../signup/singup.module.scss"
import { Button } from "../../components/form/button/button"
import { Input } from "../../components/form/input"
import { AuthContext } from "@/src/contexts/AuthContext"
import { toast } from "react-toastify"


export default function SignUp() {

  const {singUp} = useContext(AuthContext) 

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handlerCadastrar(e: FormEvent) {
    e.preventDefault();

  if(nome == " " ||  email == " " || password == " "){
    toast.error("Preencha todos os campos")
    return alert("Preencha todos os campos")
  }

    setLoading(true);

    let data = {
      nome,
      email,
      password
    }

    await singUp(data);

    setLoading(false)
  }


  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={style.container}>
        <Image src={Logo} alt="Logo Pizzaria sujeito" />

        <div className={style.login}>
          <h1>Criando sua Conta</h1>
          <form onSubmit={handlerCadastrar}>
            <Input
              placeholder="Digite seu Nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)} />


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
              Cadastrar
            </Button>
          </form>

          <Link href="/">
          <p className={style.text}>Já possui uma conta?</p>
          </Link>
        </div>
      </div>
    </>
  )
}
