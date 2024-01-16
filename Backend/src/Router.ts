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
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemsController } from "./controllers/items/AddItemController";
import { RemoveItemController } from "./controllers/items/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

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
router.get('/category/products', new ListByCategoryController().handler)


//Rotas Orders
router.post('/order', isAuthetication, new CreateOrderController().handler)
router.delete('/order',isAuthetication, new RemoveOrderController().handler)
router.put('/order' ,isAuthetication, new SendOrderController().handler)
router.get('/order',isAuthetication,new ListOrderController().handler)
router.get('/order/detail', isAuthetication,new DetailOrderController().handler)  
router.put('/order/finish' ,isAuthetication, new FinishOrderController().handler)

//Rotas de Items
router.post('/order/add',isAuthetication , new AddItemsController().handler)
router.delete('/order/add',isAuthetication, new RemoveItemController().handler)

export {router}