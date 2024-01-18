import axios,{ AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errs/AuthTokenError";
import { signOut } from "../contexts/AuthContext";


export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL:"http://localhost:3333",
        headers:{
            Authorization:`Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response =>{
        return response;
    }, (error:AxiosError)=>{
        if(error.response && error.response.status === 401){
            signOut();
        }
        if(typeof window !== undefined){
            //Chama a função para desligar o usuario
        }
        else{
            return Promise.reject(new AuthTokenError())
        }

        return Promise.reject(error);
    }) 

    return api;
}