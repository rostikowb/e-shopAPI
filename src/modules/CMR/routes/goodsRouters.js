import { Router } from 'express';
import {checkAuth} from '../../middleware/checkAuth';
import goodsGetAll from '../controllers/goods/goodsGetAll';
import goodsGetById from '../controllers/goods/goodsGetById';
import newsUpdateById from '../controllers/goods/goodsUpdateById';
import goodsCreate from '../controllers/goods/goodsCreate';
import goodsDeleteById from '../controllers/goods/goodsDeleteById';
import {commentCreate} from "../controllers/goods/commentCreate";
import {decodeToken} from "../../middleware/deshifrToken";
import {goodsCreateStub} from "../controllers/goods/create/goodsCreateStub";
import {checkAdmin} from "../../middleware/checkAdmin";
import {goodsUpdateOne} from "../controllers/goods/update/goodsUpdateOne";
// import newsUploadFile from './controllers/news/uploadFile/newsUploadFile';

const router = Router();
router.post('/', goodsGetAll);
router.post('/:catalog', goodsGetAll);
router.post('/goods/createStub', checkAuth, checkAdmin, goodsCreateStub);
router.post('/goods/update', checkAuth, checkAdmin, goodsUpdateOne);
router.post('/goods/addComment', decodeToken, commentCreate);
router.post('/goods/:goodsId', goodsGetById);

// router.post('/goods', checkAuth, goodsCreate);
// router.post('/news/uploadFile', checkAuth, newsUploadFile);

// router.patch('/goods/:goodsId', checkAuth, newsUpdateById);
// router.delete('/goods/:goodsId', checkAuth, goodsDeleteById);

export default router;