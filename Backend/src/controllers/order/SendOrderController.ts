import { Request,Response } from "express";
import { SendOrderService } from "../../services/orders/SendOrderService";

class SendOrderController{
    async handler(req:Request, res:Response){
        const {order_id} = req.body;

        const sendOrder = new SendOrderService();

        const order = await sendOrder.execute({
            order_id
        })
        return res.json(order)
    }

}

export {SendOrderController}