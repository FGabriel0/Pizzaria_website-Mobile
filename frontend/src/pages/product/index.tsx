import Head from "next/head";
import style from "./product.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Header from "../../components/Header"

export default function Product() {
  return (
    <>
      <Head>
        <title>Novo Produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={style.container}>
          <h1>Novo Produto</h1>

          <form className={style.form}>
            <select>
              <option>Bebidas</option>
              <option>Pizzas</option>
            </select>

            <input
              type="text"
              placeholder="Digite o nome do Produto"
              className={style.input}
            />

            <input
              type="text"
              placeholder="Digite o preço do Produto"
              className={style.input}
            />

            <textarea
              placeholder="Descreva seu Produto..."
              className={style.input}
            />
            <button className={style.buttonAdd} type="submit">
                Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {
//   return {
//     props: {},
//   };
// });
