import Head from "next/head"
import Logo from "../../public/logo.svg"
import Image from "next/image"
import style from "../../styles/Home.module.scss"
import { Button } from "../components/form/button/button"

import { Input } from "../components/form/input"
export default function Home() {
  return (
    <>
      <Head>
        <title>Sujeito Programador - Faça seu login</title>
      </Head>
      <div className={style.container}>
        <Image src={Logo} alt="Logo Pizzaria sujeito" />

        <div className={style.login}>
          <form>
            <Input
              placeholder="Digite seu email"
              type="text" />

            <Input
              placeholder="Digite sua senha"
              type="password" />

            <Button
             type="submit"
             Loading={false}
             >
              Acessar
             </Button>
          </form>
          <a className={style.text}>Não possui conta?</a>
        </div>
      </div>
    </>
  )
}
