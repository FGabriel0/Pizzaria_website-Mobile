import React, { useState, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../service/api";

type AuthContextData = {
    user: UserProps;
    isAuthentication: boolean;
    signIn:(credentials:SingInProps) => Promise<void>
}

type UserProps = {
    id: string,
    nome: string,
    email: string,
    token: string
}

type AuthProviderProps = {
    children: ReactNode
}

type SingInProps={
    email:string,
    password:string
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: " ",
        nome: " ",
        email: " ",
        token: " "
    })
    const [loading,setLoading] = useState(false)

    const isAuthentication = !!user.nome

    async function signIn({email,password}: SingInProps) {
        setLoading(true)
        try {
            const resp = await api.post("/session",{
                email,
                password
            })
            const {id,nome,token} = resp.data


            const data = {
                ...resp.data
            }

            await AsyncStorage.setItem("@SujeitoPizzaria",JSON.stringify(data))
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setUser({
                id,
                nome,
                email,
                token
            })
            
            setLoading(false)
            
        } catch (error) {
            console.log("Erro ao Logar")
            setLoading(false)
        }

    }

    return (
        <AuthContext.Provider value={{ user, isAuthentication,signIn }}>
            {children}
        </AuthContext.Provider>
    )
}