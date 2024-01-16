import { Request,Response } from "express";
import { FinishOrderService } from "../../services/orders/FinishOrderService";

class FinishOrderController{
    async handler(req:Request, res:Response){
        const {order_id} = req.body

        const finishOrder =  new FinishOrderService();

        const order = await finishOrder.execute({
            order_id
        })
        return res.json(order)
    }
}

export {FinishOrderController}