import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    nome:string;
    email:string;
    password:string;
}

class UsersService{
    async execute({nome,email,password}:UserRequest){
        //verificar se ele mandou um email
        if(!email){
            throw new Error("Email Incorreto")
        }

        //Verificar se o email já esta cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });
        if(userAlreadyExists){
            throw new Error("Usuario Cadastrado com esse email")
        }

        //Criptografando a senha
        const passwordHash = await hash(password,8);

        const user= await prismaClient.user.create({
            data:{
                nome: nome,
                email: email,
                password: passwordHash
            },
            //O Select é o que você quer devolver
            select:{
                id:true,
                nome:true,
                email:true
            }

        })
        return user;
    }
}

export {UsersService}