import { Router } from 'express';
import {checkAuth} from '../../middleware/checkAuth';
import {goodsGetAll} from '../controllers/goods/get/goodsGetAll';
import goodsGetById from '../controllers/goods/get/goodsGetById';
import {commentCreate} from "../controllers/goods/create/commentCreate";
import {decodeToken} from "../../middleware/deshifrToken";
import {goodsCreateStub} from "../controllers/goods/create/goodsCreateStub";
import {isAdmin} from "../../middleware/isAdmin";
import {goodsUpdateOne} from "../controllers/goods/update/goodsUpdateOne";
import {goodsSearch} from "../controllers/goods/get/goodsGetSearch";
import {getAllId} from "../controllers/goods/get/getAllId";
import {goodsDeleteById} from "../controllers/goods/delete/goodsDeleteById";

const router = Router();
router.post('/', goodsGetAll);
router.post('/:catalog', goodsGetAll);
router.post('/goods/createStub', checkAuth, isAdmin, goodsCreateStub);
router.post('/goods/update', checkAuth, isAdmin, goodsUpdateOne);
router.post('/goods/delete', checkAuth, isAdmin, goodsDeleteById);
router.post('/goods/getAllGoodsId', getAllId);
router.post('/goods/addComment', decodeToken, commentCreate);
router.post('/goods/search', goodsSearch);
router.post('/goods/:goodsId', goodsGetById);

export default router;