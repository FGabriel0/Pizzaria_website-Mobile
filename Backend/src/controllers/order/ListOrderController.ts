import { Request,Response } from "express";
import { ListOrderService } from "../../services/orders/ListOrderService";

class ListOrderController{
    async handler(req: Request,res:Response){
        const listOrder = new ListOrderService();

        const order = await listOrder.execute()

        return res.json(order)
    }
}
export {ListOrderController}