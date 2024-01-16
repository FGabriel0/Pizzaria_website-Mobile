import { Request, Response } from "express";
import { DetailOrderService } from "../../services/orders/DetailOrderService";

class DetailOrderController{
    async handler(req:Request,res:Response){
        const order_id = req.query.order_id as string;

        const detailOrderService = new DetailOrderService();

        const order = await detailOrderService.execute({
            order_id
        })
        return res.json(order)
    }
}
export{DetailOrderController}