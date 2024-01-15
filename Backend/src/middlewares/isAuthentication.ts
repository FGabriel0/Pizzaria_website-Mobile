import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}
export function isAuthetication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //Receber o Token e verificar se o token esta direcianado ao id
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split("");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;
  } catch (error) {
    return res.status(401).end();
  }
}
