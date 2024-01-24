import React, { useState, createContext, ReactNode } from "react";
type AuthContextData = {
    user: UserProps;
    isAuthentication: boolean;
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


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: " ",
        nome: " ",
        email: " ",
        token: " "
    })

    const isAuthentication = !!user.nome
    
    return (
        <AuthContext.Provider value={{ user, isAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
}