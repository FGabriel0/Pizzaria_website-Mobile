import { Request,Response } from "express";
import { DetalUserService } from "../../services/users/DetalUserService";

class DetalUserController{
    async handler(req:Request, res:Response){
        const detalUserService = new DetalUserService();

        const user = await detalUserService.execute();


        return res.json(user)
    }
}

export {DetalUserController}