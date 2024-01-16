import { Request, Response } from "express";
import { CreateOrdersService } from "../../services/orders/createOrdersService";

class CreateOrderController {
  async handler(req: Request, res: Response) {
    const { table, name } = req.body;

    const createOrdersService = new CreateOrdersService();

    const order = await createOrdersService.execute({
        table,
        name
    })

    return res.json(order)
  }
}
export { CreateOrderController };
