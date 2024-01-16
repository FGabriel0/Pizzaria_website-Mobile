import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string
}
class DetailOrderService{
    async execute({order_id}:OrderRequest){
        const orders = await prismaClient.item.findMany({
            where:{
                orders_id: order_id
            },
            include:{
                product:true,
                order: true
            }
        })
        return orders;
    }
}
export {DetailOrderService}