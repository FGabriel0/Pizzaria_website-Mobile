import { Request,Response,response } from "express";
import { UsersService } from "../../services/users/CreateUsersService";

class UserController{
    async handle(req:Request,res:Response){
        const {nome,email,password} = req.body;

        const usersService = new UsersService();

        const user = await usersService.execute({
            nome,
            email,
            password
        });

        return res.json(user)
    }
}

export{UserController}