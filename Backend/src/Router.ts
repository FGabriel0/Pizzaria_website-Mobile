import { Router,Request,Response } from "express";
import {UserController} from './controllers/users/UserController'
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetalUserController } from "./controllers/users/DetalUserController";
import { isAuthetication } from "./middlewares/isAuthentication";
const router = Router();

//ROTAS USERS
router.post('/session', new AuthUserController().handler);
router.post('/users', new UserController().handle );
router.get('/userInfor', isAuthetication, new DetalUserController().handler)

export {router}