import { Request,Response } from "express";
import { DetalUserService } from "../../services/users/DetalUserService";

class DetalUserController{
    async handler(req:Request, res:Response){

        const user_id = req.user_id;
        console.log("Id do User: ",user_id)

        const detalUserService = new DetalUserService();

        const user = await detalUserService.execute(user_id);


        return res.json(user)
    }
}

export {DetalUserController}