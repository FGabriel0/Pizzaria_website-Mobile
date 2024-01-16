import { Request, Response } from "express";

import { createProductsService } from "../../services/Products/createProductsService";

class createProductController {
  async handler(req: Request, res: Response) {
    const { nome, price, description, category_id } = req.body;

    let banner = " ";
    const CreateProductsService = new createProductsService();

    if(!req.file){
      throw new Error("Erro no upload da foto")
    }else{

      const {originalname, filename:banner} = req.file;

      const product = await CreateProductsService.execute({
        nome,
        price,
        description,
        banner,
        category_id
    });
    return res.json(product)

    }

    

  }
}

export {createProductController}
