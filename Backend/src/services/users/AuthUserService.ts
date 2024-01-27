import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string,
    password: string
}

class AuthUserService{
    async execute({email,password}:AuthRequest){
        //Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error("Email não encontrado")
        }
        
        //Verificar se a senha esta correta
        const passwordCorrect = await compare(password, user.password);

        if(!passwordCorrect){
            throw new Error("Senha incorreto")
        }

        //Gerar um token jsonwetoken
        const token = sign({
            nome:user.nome,
            email:user.email,
        },
        process.env.JWT_SECRET,{
            subject:user.id,
            expiresIn:'30d'
        })
        return{
            id:user.id,
            nome:user.nome,
            email:user.email,
            token:token
        }
    }
}

export {AuthUserService}