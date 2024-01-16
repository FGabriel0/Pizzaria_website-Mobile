import prismaClient from "../../prisma";

interface categoryResquest {
  nome: string;
}

class CreateCategoryService {
  async execute({ nome }: categoryResquest) {
    if (nome === " ") {
      throw new Error("Nome Inválido");
    }

    const category = await prismaClient.category.create({
      data: {
        nome: nome,
      },
      select: {
        id: true,
        nome: true
      },
    });

    return category;
  }
}

export { CreateCategoryService };
