import { createContext, ReactNode, useState,useEffect } from "react";
import { destroyCookie, setCookie,parseCookies } from "nookies";
import { api } from "../services/ApiClient";
import { toast } from "react-toastify";
import Router from "next/router";

type AuthContextData = {
    user: UserProps | undefined;
    isAuthentication: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    singUp:(credentials: SingUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    nome: string;
    email: string
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthContextProps = {
    children: ReactNode;
}

type SingUpProps = {
    nome: string
    email: string
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push("/")
    } catch (error) {
        console.log("Erro ao Sair")
    }
}


export function AuthProvider({ children }: AuthContextProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthentication = !!user;

    useEffect(()=>{
        //tentar pegar algo no cookie
        const{'@nextauth.token':token} = parseCookies();
        if( token){
            api.get("/me").then(response =>{
                const {id,nome,email} = response.data;
                setUser({
                    id,
                    nome,
                    email
                })
            }).catch(() =>{
                signOut()
            })
        }
    },[])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password
            })
            const { id, nome, token } = response.data
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //expira em um Mes
                path: "/"
            })

            setUser({
                id, 
                nome,
                 email
            })
            // Passar as Requisições
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success(`Seja Bem-Vindo`)

            Router.push("/dashboard")

        } catch (error) {
            toast.error("Erro ao Acesasr")
            console.log("Erro ao Acessar", error)
        }
    }

    async function singUp({nome,email,password}:SingUpProps) {
        try {
            const response = await api.post("/users", {
                nome,
                email,
                password
            })

            toast.success("Cadastrado com Sucesso")
            Router.push("/")
            
            
        } catch(error) {
            toast.error("Erro ao Cadastrar")
            console.log("Erro ao Cadastrar, ",error)
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthentication, signIn, signOut,singUp }}>
            {children}
        </AuthContext.Provider>
    )
}