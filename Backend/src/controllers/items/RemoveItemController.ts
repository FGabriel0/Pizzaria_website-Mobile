import { Request,Response } from "express";
import { RemoveItemService } from "../../services/items/RemoveItemService";

class RemoveItemController{
    async handler(req:Request, res:Response){

        const item_id = req.query.item_id as string;

        const removeItemService = new RemoveItemService();

        const item = await removeItemService.execute({
            item_id
        })
        return res.json(item)
    }
}

export {RemoveItemController}