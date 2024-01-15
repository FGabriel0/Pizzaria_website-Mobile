import { Request,Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService";

class AuthUserController {
    async handler (req:Request, res:Response){
        const {email,password} = req.body;//Requisição do banco de dados 

        const authUserService = new AuthUserService();// chamando a classe AuthUserService

        //Fornecendo o email e a senha
        const auth = await authUserService.execute({email,password});

        return res.json(auth);
    }
    
}

export {AuthUserController}