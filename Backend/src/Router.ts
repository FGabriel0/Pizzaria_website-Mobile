import { Router} from "express";
import multer from "multer";
import {UserController} from './controllers/users/UserController'
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetalUserController } from "./controllers/users/DetalUserController";
import { isAuthetication } from "./middlewares/isAuthentication";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { createProductController } from "./controllers/products/createProductController";
import uploadConfig from "./config/multer"

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

//ROTAS USERS
router.post('/session', new AuthUserController().handler);
router.post('/users', new UserController().handle );
router.get('/userInfor', isAuthetication, new DetalUserController().handler)


//Rotas Category
router.post('/category', isAuthetication,new CreateCategoryController().handler)
router.get('/category', isAuthetication, new ListCategoryController().handler);

//Rotas Product
router.post('/products' ,isAuthetication, upload.single('file'), new createProductController().handler)

export {router}