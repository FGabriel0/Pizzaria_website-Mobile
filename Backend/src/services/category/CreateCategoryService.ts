import { PrismaClient } from "@prisma/client";

class CreateCategoryService{
    async execute (){
        return{ok:true}
    }
}

export {CreateCategoryService}