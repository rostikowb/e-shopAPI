import { Router } from 'express';
import {checkAuth} from '../../middleware/checkAuth';
import goodsGetAll from '../controllers/goods/get/goodsGetAll';
import goodsGetById from '../controllers/goods/get/goodsGetById';
import {commentCreate} from "../controllers/goods/create/commentCreate";
import {decodeToken} from "../../middleware/deshifrToken";
import {goodsCreateStub} from "../controllers/goods/create/goodsCreateStub";
import {checkAdmin} from "../../middleware/checkAdmin";
import {goodsUpdateOne} from "../controllers/goods/update/goodsUpdateOne";
import {goodsSearch} from "../controllers/goods/get/goodsGetSearch";

const router = Router();
router.post('/', goodsGetAll);
router.post('/:catalog', goodsGetAll);
router.post('/goods/createStub', checkAuth, checkAdmin, goodsCreateStub);
router.post('/goods/update', checkAuth, checkAdmin, goodsUpdateOne);
router.post('/goods/addComment', decodeToken, commentCreate);
router.post('/goods/search', goodsSearch);
router.post('/goods/:goodsId', goodsGetById);

export default router;