import { Router } from 'express';
import checkAuth from '../middleware/checkAuth';
import goodsGetAll from './controllers/goods/goodsGetAll';
import goodsGetById from './controllers/goods/goodsGetById';
import newsUpdateById from './controllers/goods/goodsUpdateById';
import newsCreate from './controllers/goods/goodsCreate';
import goodsDeleteById from './controllers/goods/goodsDeleteById';
// import newsUploadFile from './controllers/news/uploadFile/newsUploadFile';

const router = Router();
router.post('/', goodsGetAll);
router.post('/:catalog', goodsGetAll);
router.post('/goods', checkAuth, newsCreate);
// router.post('/news/uploadFile', checkAuth, newsUploadFile);
router.post('/goods/:goodsId', goodsGetById);
router.patch('/goods/:goodsId', checkAuth, newsUpdateById);
router.delete('/goods/:goodsId', checkAuth, goodsDeleteById);

export default router;