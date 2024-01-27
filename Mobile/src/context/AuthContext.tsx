import React, {useState, createContext, ReactNode, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../service/api'


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

type UserProps = {
  id: string;
  nome: string;
  email: string;
  token: string
}


type AuthProviderProps = {
  children: ReactNode;
}

type SignInProps = {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState<UserProps>({
    id: '',
    nome: '',
    email: '',
    token: ''
  })

  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.nome; 

  useEffect(() => {

    async function getUser(){
      //Pegar os dados salvos do user
      const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');
      let hasUser: UserProps = JSON.parse(userInfo || '{}')

      // Verificar se recebemos as informaçoes dele.
      if(Object.keys(hasUser).length > 0){
        setUser({
          id: hasUser.id,
          nome: hasUser.nome,
          email: hasUser.email,
          token: hasUser.token
        })
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`


      }

      setLoading(false);

    }


    getUser();

  }, [])


async function signIn({ email, password }: SignInProps){
  setLoading(true);

  try{
    const response = await api.post('/session', {
      email,
      password
    })
    //console.log(response.data);

    const { id, nome, token } = response.data;

    const data = {
      ...response.data
    };

    await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`


    setUser({
      id,
      nome,
      email,
      token,
    })

    setLoading(false);


  }catch(err:any){
          console.log('Erro no servidor:', err.response.data);
    setLoading(false);
  }

}


  async function signOut(){
    await AsyncStorage.clear()
    .then( () => {
      setUser({
        id: '',
        nome: '',
        email: '',
        token: ''
      })
    })
  }

  return(
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        signIn, 
        loading, 
        loadingAuth,
        signOut
        }}
    >
      {children}
    </AuthContext.Provider>
  )
}

